import { createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import ParticipantesList from "./ParticipantesList";
import RegistroParticipante from "./RegistroParticipante";
import Gafete from "./Gafete";
import NotFound from "./NotFound";
import LayoutPublic from "../layout/LayoutPublic";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPublic />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "participantes",
        element: <ParticipantesList />,
      },
      {
        path: "registro",
        element: <RegistroParticipante />,
      },
      {
        path: "gafete/:id",
        element: <Gafete />,
      },
    ],
  },
]);
