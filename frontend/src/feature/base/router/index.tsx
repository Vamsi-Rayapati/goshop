import Orders from "feature/orders";
import Users from "feature/users";
import MainLayout from "feature/base/layout";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "feature/auth/login";
import Signup from "feature/auth/signup";
import { ROUTE } from "./constants";
import Products from "feature/products/components/Products";

const router = createBrowserRouter([
    {
      path: '/',
      element:  <Navigate to={localStorage.getItem('token') ? '/console' : ROUTE.LOGIN}/> 
    },
    {
      path: ROUTE.CONSOLE,
      element: <MainLayout/>,
      children: [
        {
            path: ROUTE.USERS,
            element: <Users/>
        },
        {
          path: ROUTE.PROFILE,
          element: <Users/>
        },
        {
          path: ROUTE.ORDERS,
          element: <Orders/>
        },
        {
          path: ROUTE.PRODUCTS,
          element: <Products/>
        }
      ]
    },
    { path: ROUTE.LOGIN, element: <Login/>},
    { path: ROUTE.SIGNUP, element: <Signup/>},
    
]);

export default router;