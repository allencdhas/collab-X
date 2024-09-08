import App from "App";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home"
import CreateProject from "../pages/CreateProject/CreateProject"
import DisplayProject from "pages/DisplayProject/DisplayProject";
import DisplayEpisode from "pages/DisplayEpisode/DisplayEpisode";
import DisplayInspiration from "pages/DisplayInspiration/DisplayInspiration";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children:[
            {path: "/", element: <Home />},
            {path: "/create", element: <CreateProject />},
            {path: "/display", element: <DisplayProject />},
            {path: "/episode", element: <DisplayEpisode />},
            //{path: "/display", element: <DisplayContent />},
            {path: "/inspiration", element: <DisplayInspiration />},
            // {path: "/projects", element: <Home />}
        ]
    }
]);
