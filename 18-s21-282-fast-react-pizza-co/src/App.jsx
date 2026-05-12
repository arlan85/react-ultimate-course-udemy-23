import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Cart from "./modules/cart/Cart";
import Menu from "./modules/menu/Menu";
import CreateOrder from "./modules/order/CreateOrder";
import Order from "./modules/order/Order";
import AppLayout from "./ui/AppLayout";
import Home from "./ui/Home";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
        // children: [], // nested routes go here
      },
      { path: "/menu", element: <Menu /> },
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
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
