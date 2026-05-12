import { Outlet } from "react-router-dom";
import CartOverview from "../modules/cart/CartOverview";
import Header from "./Header";

function AppLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
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
