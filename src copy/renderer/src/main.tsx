import './assets/base.css'

import {RouterProvider} from "react-router-dom";
import React from 'react'
import ReactDOM from 'react-dom/client'
import { routes } from './routes';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={routes}/>
  </React.StrictMode>
)
