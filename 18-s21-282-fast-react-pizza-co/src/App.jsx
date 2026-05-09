import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./ui/Home";
import Menu from "./modules/menu/Menu";
import Cart from "./modules/cart/Cart";
import Order from "./modules/order/Order";
import CreateOrder from "./modules/order/CreateOrder";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  { path: "/menu", 
    element: <Menu /> 
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/order/:orderId",
    element: <Order />,
  },
  {
    path: "/order/new",
    element: <CreateOrder />,
  },
  {
    path: "*",
    element: <h1>404 Not Found</h1>,
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
