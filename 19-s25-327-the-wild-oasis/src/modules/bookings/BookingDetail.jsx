import styled from "styled-components";

import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Tag from "../../ui/Tag";

import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiMiniBookmarkSlash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useMoveBack } from "../../hooks/useMoveBack";
import PageNotFound from "../../pages/PageNotFound";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";
import Spinner from "../../ui/Spinner";
import { STATUS_TAG_NAMES } from "../../utils/constants";
import BookingDataBox from "./BookingDataBox";
import { useBooking } from "./useBooking";
import { useCancel } from "./useCancel";
import { useCheckout } from "./useCheckout";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const { booking, isLoading, error } = useBooking();
  const { checkout, isCheckingOut } = useCheckout();
  const { cancelBooking, isCancelling } = useCancel();

  if (isLoading) return <Spinner />;
  if (error || !booking) return <PageNotFound />;

  const { status, id: bookingId } = booking;

  const statusToTagName = STATUS_TAG_NAMES;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            <HiArrowDownOnSquare /> Check in
          </Button>
        )}
        {status === "checked-in" && (
          <Button onClick={() => checkout(bookingId)} disabled={isCheckingOut}>
            <HiArrowUpOnSquare />
            Check out
          </Button>
        )}
        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger">
              <HiMiniBookmarkSlash /> Cancel booking
            </Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              action="cancel"
              resourceName="booking"
              onConfirm={() =>
                cancelBooking(bookingId, { onSettled: () => navigate(-1) })
              }
              disabled={isCancelling}
            />
          </Modal.Window>
        </Modal>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
