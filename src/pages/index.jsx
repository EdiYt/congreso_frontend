import { createBrowserRouter } from "react-router-dom";
import Home from "./Home.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

]);
