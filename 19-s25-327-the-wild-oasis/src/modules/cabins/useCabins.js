import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  const {
    isPending,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"], //needs to be an array to identify each data to be reado from the cache
    queryFn: getCabins, //this will query the data from the API, needs to return a promise fetch() for example. This will return the data when the promise gets resolved
  });

  return { cabins, isPending, error };
}
