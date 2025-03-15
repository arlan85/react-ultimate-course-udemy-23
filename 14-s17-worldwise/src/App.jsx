import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import City from "./components/City";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import Form from "./components/Form";
import { CitiesProvider } from "./contexts";
import AppLayout from "./pages/AppLayout";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";


function App() {
  
  return (
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="login" element={<Login />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate to='cities' replace/>} />
            <Route path="cities" element={<CityList/> } />
            <Route path="cities/:id" element={<City/>} />
            <Route path="countries" element={<CountryList/>} />
            <Route path="form" element={<Form/>} />
          </Route>
          {/* this matches all paths that do not match the above routes */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  );
}

export default App;
