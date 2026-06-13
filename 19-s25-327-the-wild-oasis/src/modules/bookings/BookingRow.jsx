import { format, isToday } from "date-fns";
import styled from "styled-components";

import Table from "../../ui/Table";
import Tag from "../../ui/Tag";

import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiMiniBookmarkSlash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import { STATUS_TAG_NAMES } from "../../utils/constants";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import { useCancel } from "./useCancel";
import { useCheckout } from "./useCheckout";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckout();
  const { cancelBooking, isCancelling } = useCancel();

  const statusToTagName = STATUS_TAG_NAMES;

  return (
    <Modal>
      <Table.Row>
        <Cabin>{cabinName}</Cabin>

        <Stacked>
          <span>{guestName}</span>
          <span>{email}</span>
        </Stacked>

        <Stacked>
          <span>
            {isToday(new Date(startDate))
              ? "Today"
              : formatDistanceFromNow(startDate)}{" "}
            &rarr; {numNights} night stay
          </span>
          <span>
            {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
            {format(new Date(endDate), "MMM dd yyyy")}
          </span>
        </Stacked>
        {/* <Stacked>
        {numGuests}
        </Stacked> */}

        <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

        <Amount>{formatCurrency(totalPrice)}</Amount>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} aria-label="Booking options" />
          <Menus.List id={bookingId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/bookings/${bookingId}`)}
            >
              See Details
            </Menus.Button>
            {status === "unconfirmed" && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/checkin/${bookingId}`)}
              >
                Check in
              </Menus.Button>
            )}
            {status === "checked-in" && (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                onClick={() => checkout(bookingId)}
                disabled={isCheckingOut}
              >
                Check out
              </Menus.Button>
            )}

            <Modal.Open opens="delete">
              <Menus.Button icon={<HiMiniBookmarkSlash />}>
                Cancel booking
              </Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>
      </Table.Row>
      <Modal.Window name="delete">
        <ConfirmDelete
          action="cancel"
          resourceName="booking"
          disabled={isCancelling}
          onConfirm={() => cancelBooking(bookingId)}
        />
      </Modal.Window>
    </Modal>
  );
}

export default BookingRow;
