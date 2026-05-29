import { Link } from "react-router-dom"
import SearchOrder from "../modules/order/SearchOrder"
import Username from "../modules/user/Username"

function Header() {
  return (
    <header className="bg-yellow-500 p-4 uppercase border-b-4 border-stone-300 sm:px-6">
      <Link to="/" className="tracking-widest">
        Fast Pizza Co.
      </Link>
      <SearchOrder/>
      <Username/>
    </header>
  )
}

export default Header
