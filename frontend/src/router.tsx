import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./views/MainLayout";
import FileCompressor from "./views/compress/FileCompressor";

const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
      children: [
        {
            path: "/compress",
            element: <FileCompressor/>
        }
      ]
    },
    
]);

export default router;