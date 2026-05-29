import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../modules/cart/CartOverview";
import Header from "./Header";
import Loader from "./Loader";

function AppLayout({ children }) {
/* is is a global state for whole app 
  So, that's the whole reason why we placed this
loading indicator in the app layout in the first place,
because this will then render our loader
each time that somewhere in the app something is loading.*/
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
      <footer className="bg-gray-800 text-stone-100 p-4 text-center">
        &copy; 2024 Fast React Pizza Co. All rights reserved.
      </footer>
    </div>
  );
}

export default AppLayout;
