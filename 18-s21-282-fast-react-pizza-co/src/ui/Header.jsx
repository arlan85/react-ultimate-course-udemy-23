import { Link } from "react-router-dom"
import SearchOrder from "../modules/order/SearchOrder"
import Username from "../modules/user/Username"

function Header() {
  return (
    <header className="bg-yellow-500 p-4 uppercase">
      <Link to="/" className="tracking-widest">
        Fast Pizza Co.
      </Link>
      <SearchOrder/>
      <Username/>
    </header>
  )
}

export default Header
