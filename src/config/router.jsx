import { createBrowserRouter } from "react-router-dom";

import RootLayout from "../layout/RootLayout";
import PrivateLayout from "../layout/PrivateLayout";
import Login from "../pages/Login";
import Publicar from "../pages/Publicar";
import Dashboard from "../pages/Dashboard";
import Panel from '../pages/Panel';


export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Login />,
            },
            {
                path: "dashboard",
                element: <PrivateLayout />,
                children: [
                    {
                        index: true,
                        element: <Dashboard />,
                    },
                    {
                        path: "publicaciones",
                        element: <Publicar />,
                    },
                    {
                        path: "panel",
                        element: <Panel />,
                    },
                ],
            },
        ],
    },
]);
