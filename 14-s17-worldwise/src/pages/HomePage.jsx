import { Link } from "react-router-dom"
import Navigation from "../components/Navigation"

function HomePage() {
  return (
    <div>
      <Navigation/> 
      WorldWise
      <Link to="/pricing">Pricing</Link>
    </div>
  )
}

export default HomePage
