import App from "App";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home"
import CreateProject from "../pages/CreateProject/CreateProject"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children:[
            {path: "/", element: <Home />},
            {path: "/createproject", element: <CreateProject />},
            // {path: "/projects", element: <Home />},
            // {path: "/projects", element: <Home />}
        ]
    }
]);