import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AppLayout } from "./Component/Layout/AppLayout";

import Home from "./Pages/Home";
import Menu from "./Pages/Menu";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Checkout from "./Pages/Checkout";
import Profile from "./Pages/Profile";
import Orders from "./Pages/Orders";
import Category from "./Pages/Category";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,

      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/menu",
          element: <Menu />,
        },
        {
          path: "/menu/:categorySlug",
          element: <Category />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/checkout",
          element: <Checkout />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
