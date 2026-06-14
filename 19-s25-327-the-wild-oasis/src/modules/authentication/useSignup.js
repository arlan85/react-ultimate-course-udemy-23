import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signup as signupApi } from "../../services/apiAuth";

export function useSignup() {
  const {
    mutate: signup,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success(
        "Account created successfully! Please verify the account from the user's email address.",
      );
    },
    onError: (error) => toast.error(error.message),
  });
  return { signup, isLoading, error };
}
