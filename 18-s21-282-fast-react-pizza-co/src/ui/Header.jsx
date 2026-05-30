import { Link } from 'react-router-dom';
import SearchOrder from '../modules/order/SearchOrder';
import Username from '../modules/user/Username';

function Header() {
  return (
    <header className="flex items-center justify-around border-b-4 border-stone-300 bg-yellow-500 p-4 font-serif uppercase sm:px-6">
      <Link to="/" className="tracking-widest">
        Fast React Pizza Co.
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}

export default Header;
