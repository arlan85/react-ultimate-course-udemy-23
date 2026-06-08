import BookingTable from "../modules/bookings/BookingTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <p>TEST</p>
      </Row>
      <BookingTable></BookingTable>
    </>
  );
}

export default Bookings;
