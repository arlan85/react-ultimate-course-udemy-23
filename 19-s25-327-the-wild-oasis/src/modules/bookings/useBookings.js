import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookings } from "../../services/apiBookings";

export function useBookings() {
  const [seachParams] = useSearchParams();
  const queries = seachParams.entries();
  let filters = { sortBy: "startDate-desc" };
  for (const [key, value] of queries) {
    //an array of arrays
    filters[key] = value;
  }
  const {
    data: bookings,
    error,
    isPending: isLoading,
  } = useQuery({
    queryKey: ["bookings", filters],
    queryFn: () => getBookings(filters),
  });
  return { bookings, error, isLoading };
}
