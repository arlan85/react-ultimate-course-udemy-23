import { Link } from "react-router-dom"

function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <Link to="/" className="text-2xl font-bold">
        Fast Pizza Co.
      </Link>
      <p>Arlan</p>
    </header>
  )
}

export default Header
