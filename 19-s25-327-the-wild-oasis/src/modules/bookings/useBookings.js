import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookings } from "../../services/apiBookings";

export function useBookings() {
  const [seachParams] = useSearchParams();
  const filters = {};
  let sortingRaw = seachParams.get("sortBy") || "startDate-desc";
  const [field, order] = sortingRaw.split("-");
  const sorting = { [field]: order };

  let page = seachParams.get("page") ? Number(seachParams.get("page")) : 1;

  const allKeys = seachParams.entries();
  for (const [key, value] of allKeys) {
    if (key !== "page" && key !== "sortBy" && value) {
      filters[key] = value;
    }
  }

  const {
    data: { data: bookings, count } = {}, // needed because mpety at frist
    error,
    isPending: isLoading,
  } = useQuery({
    queryKey: ["bookings", filters, sorting, page],
    queryFn: () => getBookings({ filters, sorting, page }),
  });
  return { bookings, error, isLoading, count };
}
