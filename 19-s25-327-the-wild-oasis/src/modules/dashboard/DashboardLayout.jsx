import styled from "styled-components";
import { useCabins } from "../../modules/cabins/useCabins";
import Spinner from "../../ui/Spinner";
import SalesChart from "./SalesChart";
import Stats from "./Stats";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;
function DashboardLayout() {
  const { bookings, isLoading } = useRecentBookings();
  const {
    stays,
    confirmedStays,
    isLoading: staysLoading,
    numDays,
  } = useRecentStays();
  const { cabins, isLoading: isLoading3 } = useCabins();

  if (isLoading || staysLoading || isLoading3) return <Spinner />;
  // console.log(bookings, stays);
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        cabinCount={cabins.length}
        numDays={numDays}
      />
      <div>today's activities</div>
      <div>Chart stay duration</div>
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
