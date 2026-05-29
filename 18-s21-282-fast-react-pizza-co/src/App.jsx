import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Cart from "./modules/cart/Cart";
import Menu, { loader as menuLoader } from "./modules/menu/Menu"; //renamed for  improve readability
import CreateOrder from "./modules/order/CreateOrder";
import Order , {loader as getOrder} from "./modules/order/Order";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";
import Home from "./ui/Home";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
        // children: [], // nested routes go here
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      }, //step 2 add the loader to the route
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: getOrder,
        errorElement: <Error />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
      },
      // {
      //   path: "*",
      //   element: <h1>404 Not Found</h1>,
      // },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
