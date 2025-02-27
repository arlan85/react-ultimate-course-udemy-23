import { Link } from "react-router-dom"
import AppNav from "../components/AppNav"
import Navigation from "../components/Navigation"

function HomePage() {
  return (
    <div>
      <Navigation/> 
      <AppNav/>
      <h1 className="test">WorldWise</h1>
      <Link to="/app">Go to the app</Link>
    </div>
  )
}

export default HomePage
