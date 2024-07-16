import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home';
import './index.css';

const BrowserRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={BrowserRouter} />
  </React.StrictMode>
);