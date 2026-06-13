import styled from "styled-components";
import BookingDataBox from "../../modules/bookings/BookingDataBox";

import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";

import { useState } from "react";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useSettings } from "../../modules/settings/useSettings";
import Spinner from "../../ui/Spinner";
import { formatCurrency } from "../../utils/helpers";
import { useBooking } from "../bookings/useBooking";
import { useCheckin } from "../bookings/useCheckin";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const { booking, isLoading } = useBooking();
  const { checkin, isCheckinIn } = useCheckin();
  const { settings, isLoading: isSettingsLoading } = useSettings();
  const [confirmPaid, setConfirmPaid] = useState(booking?.isPaid ?? false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  // eslint-disable-next line react-hooks/set-state-in-effect
  // useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

  if (isLoading || isSettingsLoading) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfast = settings.breakfastPrice * numGuests;

  function handleCheckin() {
    if (!confirmPaid) return;
    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfast,
          totalPrice: optionalBreakfast + totalPrice,
        },
      });
    } else checkin({ bookingId, breakfast: {} });
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      <Box>
        {" "}
        <Checkbox
          checked={addBreakfast}
          onChange={() => {
            setAddBreakfast((confirm) => !confirm);
            setConfirmPaid(false);
          }}
          id="breakfast"
        >
          Want to add breakfast for{" "}
          <strong>{formatCurrency(optionalBreakfast)}</strong>?
        </Checkbox>
      </Box>
      <Box>
        <Checkbox
          checked={confirmPaid || isCheckinIn}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          id="confirmPaid"
          disabled={confirmPaid}
        >
          I Confirm that {guests.fullName} has paid the total amount of{" "}
          <strong>
            {!addBreakfast
              ? formatCurrency(totalPrice)
              : `${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreakfast)} (${formatCurrency(totalPrice + optionalBreakfast)})`}
          </strong>
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckinIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
