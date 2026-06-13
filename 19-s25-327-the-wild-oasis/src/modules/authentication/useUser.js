import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const { data: user, isPending: isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  // console.log("user", user, user?.role === "authenticated");
  return { isLoading, user, isAuthenticated: user?.role === "authenticated" };
}
