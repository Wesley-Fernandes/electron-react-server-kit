import {createHashRouter} from "react-router-dom";
import Layout from "./components/Layout";
import LoginPage from "./views/Login-page";
import Homepage from "./views/Home-page";
import GeneratorsPage from "./views/Gerators-page";
import PatrollersPage from "./views/Patrollers-page";
import EventsPage from "./views/Events-page";
import ServicesPage from "./views/Services-page";
import CondominiumsPage from "./views/Condominiums-page";
import RegisterPage from "./views/Register-page";
import Views from "./views";

export const routes = createHashRouter([{
      path: "/",
      element: <Layout/>,
      children: [
        {path: "/", element: <LoginPage/>},
        {path: "/signup", element: <RegisterPage/>},
        {path: "/auth/home", element: <Homepage/>},
        {path: "/auth/generators", element: <GeneratorsPage/>},
        {path: "/auth/patrollers", element: <PatrollersPage/>},
        {path: "/auth/Add-Patroller", element: <Views.Patroller.ADD/>},
        {path: "/auth/List-Patroller", element: <Views.Patroller.LIST/>},
        {path: "/auth/Add-Patrol/", element: <Views.Patrol.ADD/>},
        {path: "/auth/Service-Patrol/:id", element: <Views.Patrol.Update/>},
        {path: "/auth/condominiums", element: <CondominiumsPage/>},
        {path: "/auth/events", element: <EventsPage/>},
        {path: "/auth/services", element: <ServicesPage/>},
      ]
    },
  ]);