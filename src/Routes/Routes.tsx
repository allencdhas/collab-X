import App from "App";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home"
import CreateProject from "../pages/CreateProject/CreateProject"
import DisplayProject from "pages/DisplayProject/DisplayProject";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children:[
            {path: "/", element: <Home />},
            {path: "/create", element: <CreateProject />},
            {path: "/project", element: <DisplayProject />},
            // {path: "/projects", element: <Home />}
        ]
    }
]);