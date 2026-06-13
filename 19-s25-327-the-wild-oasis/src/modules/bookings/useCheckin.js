import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updateBooking } from "../../services/apiBookings";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  const { mutate: checkin, isPending: isCheckinIn } = useMutation({
    mutationFn: (
      { bookingId, breakfast }, //needs the booking id here to manage the mutation
    ) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries({ active: true }); //dont need to remember the keys
      navigate("/dashboard");
    },
    onError: () => {
      toast.error(`There was an error wile checking in`);
    },
  });

  return { checkin, isCheckinIn };
}
