import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/helpers';
import { getCartTotals } from './cartSlice';

function CartOverview() {
  const { totalItems, totalPrice } = useSelector(getCartTotals);
  if (!totalItems) return null;
  
  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{totalItems} pizzas</span>{' '}
        <span> {formatCurrency(totalPrice)}</span>
      </p>
      <Link to="/cart" className="tracking-widest">
        Open cart &rarr;
      </Link>
    </div>
  );
}

export default CartOverview;
