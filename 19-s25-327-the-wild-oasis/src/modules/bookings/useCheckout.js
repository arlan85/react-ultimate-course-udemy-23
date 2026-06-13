import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updateBooking } from "../../services/apiBookings";

export function useCheckout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: checkout, isPending: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking ${data.id} succesfully checked out`);
      queryClient.invalidateQueries({ active: true });
      // navigate("/");
    },
    onError: () => {
      toast.error("Something happened checking out the booking");
    },
  });

  return { checkout, isCheckingOut };
}
