import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { logout as logoutApi } from "../../services/apiAuth";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending: isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      toast.success("See you soon!");
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
    onError: (error) =>
      toast.error(error.message || "There was an issue login you out"),
  });
  return { logout, isLoading };
}
