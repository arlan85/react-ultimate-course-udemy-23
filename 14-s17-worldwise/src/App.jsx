import { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SpinnerFullPage from "./components/SpinnerFullPage";
import { AuthProvider, CitiesProvider } from "./contexts";
import ProtectedRoute from "./pages/ProtectedRoute"; 

import City from "./components/City";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import Form from "./components/Form";

// PAGES
// import AppLayout from "./pages/AppLayout";
// import HomePage from "./pages/HomePage";
// import Login from "./pages/Login";
// import PageNotFound from "./pages/PageNotFound";
// import Pricing from "./pages/Pricing";
// import Product from "./pages/Product";

// dist/assets/index-GViQfvm-.css   30.24 kB │ gzip:   5.08 kB
// dist/assets/index-CVGo-FYo.js   566.52 kB │ gzip: 167.19 kB

const AppLayout  = lazy(()=>import("./pages/AppLayout"))
const HomePage  = lazy(()=>import("./pages/HomePage"))
const Login  = lazy(()=>import("./pages/Login"))
const PageNotFound  = lazy(()=>import("./pages/PageNotFound"))
const Pricing  = lazy(()=>import("./pages/Pricing"))
const Product  = lazy(()=>import("./pages/Product"))

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
        <Suspense fallback={<SpinnerFullPage/>}>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="product" element={<Product />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="login" element={<Login />} />
            <Route
              path="app"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="cities" replace />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
            {/* this matches all paths that do not match the above routes */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
