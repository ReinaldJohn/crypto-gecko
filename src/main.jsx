import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import routes from "./routes"; // Import the routes
import CryptoProvider from "./context/ContextProvider"; // import the provider

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <CryptoProvider>
    <RouterProvider router={routes} />
  </CryptoProvider>
);
