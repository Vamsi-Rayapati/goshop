import Orders from "feature/orders";
import Users from "feature/users";
import MainLayout from "feature/base/layout";
import { createBrowserRouter } from "react-router-dom";


const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
      children: [
        {
            path: "/users",
            element: <Users/>
        },
        {
          path: "/profile",
          element: <Users/>
        },
        {
          path: "/orders",
          element: <Orders/>
        }
      ]
    },
    
]);

export default router;