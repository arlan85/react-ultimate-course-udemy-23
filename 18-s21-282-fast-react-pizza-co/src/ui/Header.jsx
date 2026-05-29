import { Link } from "react-router-dom"
import SearchOrder from "../modules/order/SearchOrder"

function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <Link to="/" className="text-2xl font-bold">
        Fast Pizza Co.
      </Link>
      <SearchOrder/>
      <p>Arlan</p>
    </header>
  )
}

export default Header
