import { createBrowserRouter } from "react-router-dom";

import NotFound from "./components/SpecialPages/NotFound";
import Layout from "./components/Layout/Layout";
import HomePage from "./components/Pages/HomePage";
import Favorites from "./components/Pages/Favorites";
import CoinDetails from "./components/Pages/CoinDetails";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "coin-details/:coin",
        element: <CoinDetails />,
      },
      {
        path: "my-favorites",
        element: <Favorites />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
