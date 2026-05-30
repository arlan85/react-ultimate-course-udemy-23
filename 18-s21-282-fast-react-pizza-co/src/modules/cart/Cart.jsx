import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../../modules/cart/CartItem';
import Button from '../../ui/form/Button';
import LinkButton from '../../ui/form/LinkButton';
import { clearCart, getCart } from './cartSlice';
import EmptyCart from './EmptyCart'

function Cart() {
  const username = useSelector((state) => state.user.username);

  const cart = useSelector(getCart);
  const dispatch = useDispatch();
if(!cart.length) return <EmptyCart/>
  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">
        Your cart, <i>{username}</i>
      </h2>
      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((pizza) => (
          <CartItem key={pizza.pizzaId} item={pizza} />
        ))}
      </ul>
      <div className="mt-6 space-x-4">
        <Button to="/order/new">Order pizzas</Button>
        <Button type="secondary" onClick={() => dispatch(clearCart())}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
