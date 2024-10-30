import {createHashRouter} from "react-router-dom";
import {Layout} from "./components/Layout";
import Home from "./views/Home";
import StatusPage from "./views/StatusPage";


export const routes = createHashRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/status",
          element: <StatusPage />,
        },
      ],
    },
  ]);