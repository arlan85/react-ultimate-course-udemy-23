import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../modules/cart/CartOverview";
import Header from "./Header";
import Loader from "./Loader";

function AppLayout({ children }) {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div className="layout">
      {isLoading && <Loader />}
      <Header />
      <main className="flex-grow container mx-auto p-4">
        <Outlet />
        {children}
        <CartOverview />
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        &copy; 2024 Fast React Pizza Co. All rights reserved.
      </footer>
    </div>
  );
}

export default AppLayout;
