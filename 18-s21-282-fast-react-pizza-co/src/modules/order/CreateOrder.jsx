// import { useState } from "react";

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, useActionData, useNavigation } from 'react-router-dom';
import Button from '../../ui/form/Button';
import { formatCurrency } from '../../utils/helpers';
import { getCart, getCartTotals } from '../cart/cartSlice';
import EmptyCart from '../cart/EmptyCart';
import { fetchAddress } from '../user/userSlice';
import OrderItem from './OrderItem';

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: 'Mediterranean',
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: 'Vegetale',
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: 'Spinach and Mushroom',
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function CreateOrder() {
  const navigation = useNavigation();
  const [withPriority, setWithPriority] = useState(false);

  const isSubmitting = navigation.state === 'submitting';
  const user = useSelector((state) => state.user);
  const {
    username,
    address,
    error: addressError,
    status: addressStatus,
    position,
  } = user;
  const isLoading = addressStatus === 'loading';

  const formErrors = useActionData();

  const cart = useSelector(getCart);
  const dispatch = useDispatch();
  const { totalItems, totalPrice } = useSelector(getCartTotals);
  const priorityPrice = withPriority ? totalPrice * 0.2 : 0;
  const finalPrice = totalPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST" action="">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            defaultValue={username}
            required
            className="input grow"
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input w-full" />
            {formErrors?.phone && (
              <p className="mt-1 rounded-md bg-red-200 p-2 text-xs text-red-800">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              disabled={isLoading}
              defaultValue={address}
              className="input w-full"
            />
            {addressError && (
              <p className="mt-1 rounded-md bg-red-200 p-2 text-xs text-red-800">
                {addressError}
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <span className="absolute right-1 top-[35px] z-50 sm:right-[5px] sm:top-[5px]">
              <Button
                type="small"
                disabled={isLoading}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get position
              </Button>
            </span>
          )}
        </div>

        <div className="mb-10 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>
        <div className="mb-10">
          <span className="text-md font-medium">Order summary</span>
          <ul className="mt-4 max-w-md divide-y divide-stone-300 border-b border-t">
            {cart?.map((item) => (
              <OrderItem key={item.pizzaId} item={item} />
            ))}
          </ul>
          <div className="items-left text-md mt-4 flex flex-col gap-2 font-medium uppercase text-stone-600">
            <p>Items: {totalItems}</p>
            <p>SubTotal: {formatCurrency(totalPrice)}</p>
            {withPriority && (
              <p>Priority Delivery: {formatCurrency(priorityPrice)}</p>
            )}
          </div>
        </div>
        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.latitude},${position.longitude}`
                : ''
            }
          />
          <Button disabled={isSubmitting}>
            {isSubmitting
              ? 'Placing Order'
              : `Order now for ${formatCurrency(finalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CreateOrder;
