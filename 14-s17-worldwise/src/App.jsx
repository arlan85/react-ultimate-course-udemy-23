import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import City from "./components/City";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import Form from "./components/Form";
import AppLayout from "./pages/AppLayout";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";

const BASE_URL = "http://localhost:9000";

function App() {
  const [cities, setCities] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  useEffect(function() {
    async function fetchCities() {
      try {
        setIsLoading(true)
        const res = await fetch(`${BASE_URL}/cities`)
        const data = await res.json()
        setCities(data)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchCities()
  }, [])
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="login" element={<Login />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate to='cities' replace/>} />
            <Route path="cities" element={<CityList cities={cities} isLoading={isLoading}/>} />
            <Route path="cities/:id" element={<City/>} />
            <Route path="countries" element={<CountryList cities={cities} isLoading={isLoading}/>} />
            <Route path="form" element={<Form/>} />
          </Route>
          {/* this matches all paths that do not match the above routes */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
