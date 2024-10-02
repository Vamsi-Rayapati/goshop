import Orders from "feature/orders";
import Users from "feature/users";
import MainLayout from "feature/base/layout";
import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthLayout from "feature/auth";
import Login from "feature/auth/login";
import Signup from "feature/auth/signup";
import { ROUTE } from "./constants";
import Onboarding from "feature/auth/onboarding";


const router = createBrowserRouter([
    {
      path: '/',
      element:  <Navigate to={localStorage.getItem('token') ? ROUTE.CONSOLE:ROUTE.LOGIN}/> 
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
        }
      ]
    },
    { path: ROUTE.LOGIN, element: <Login/>},
    { path: ROUTE.SIGNUP, element: <Signup/>},
    { path: ROUTE.ONBOARDING, element: <Onboarding/>}
    
]);

export default router;