// import { redirect } from "react-router-dom";
// import { createOrder } from "../../services/apiRestaurant";

import { redirect } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import store from '../../store';
import { clearCart } from '../cart/cartSlice';

const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const errors = {};
  if (!isValidPhone(data.phone)) {
    errors.phone = 'Phone number is not valid please check it';
  }

  if (Object.keys(errors).length !== 0) return errors;

  const order = {
    ...data,
    cart: JSON.parse(data.cart || []),
    priority: data.priority == 'true',
  };

  const result = await createOrder(order);

  store.dispatch(clearCart()); // DO NOT  overuse

  return redirect(`/order/${result.id}`);
}
