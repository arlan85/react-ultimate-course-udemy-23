import BookingTable from "../modules/bookings/BookingTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BookingTableOperations from "../modules/bookings/BookingTableOperations";

function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookingTableOperations/>
      </Row>
      <BookingTable></BookingTable>
    </>
  );
}

export default Bookings;
