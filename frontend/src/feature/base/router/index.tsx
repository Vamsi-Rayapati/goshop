import Orders from "feature/orders";
import Users from "feature/users";
import MainLayout from "feature/base/layout";
import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthLayout from "feature/auth";
import Login from "feature/auth/login";
import Signup from "feature/auth/signup";


const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to={'/auth/login'}/>
    },
    {
      path: "/console",
      element: <MainLayout/>,
      children: [
        {
            path: "/console/users",
            element: <Users/>
        },
        {
          path: "/console/profile",
          element: <Users/>
        },
        {
          path: "/console/orders",
          element: <Orders/>
        }
      ]
    },
    {
      path: '/auth/login',
      element: <Login/>
    },
    {
      path: '/auth/signup',
      element: <Signup/>
    }
    
]);

export default router;