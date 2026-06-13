import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";

export function useCancel() {
  const queryClient = useQueryClient();
  const { mutate: cancelBooking, isPending: isCancellingBooking } = useMutation(
    {
      mutationFn: (bookingId) =>
        updateBooking(bookingId, {
          cancelDate: new Date().toISOString().slice(0, -1),
          status: "cancelled",
        }),
      onSuccess: (data) => {
        toast.success(`Booking #${data.id} cancelled succesfully`);
        queryClient.invalidateQueries({ active: true });
      },
      onError: () => toast.error("There was an erro cancelling the booking"),
    },
  );
  return { cancelBooking, isCancelling: isCancellingBooking };
}
