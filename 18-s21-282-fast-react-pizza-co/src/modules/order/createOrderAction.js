import { redirect } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";

const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const errors = {};
  if (!isValidPhone(data.phone)) {
    errors.phone = "Phone number is not valid please check it";
  }

  if (Object.keys(errors).length !== 0) return errors;

  const order = {
    ...data,
    cart: JSON.parse(data.cart || []),
    priority: data.priority == "on",
  };

  const result = await createOrder(order);

  return redirect(`/order/${result.id}`);
}
