import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateUser as updatedUserApi } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: updatedUserApi,
    onSuccess: ({ user }) => {
      toast.success("User Account updated successfully");
      queryClient.setQueryData(["user"], user);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) =>
      toast.error(error.message || "Error updating user data"),
  });
  return { updateUser, isUpdatinmg: isUpdating };
}
