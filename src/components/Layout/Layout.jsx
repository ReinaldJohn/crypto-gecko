import { Outlet } from "react-router-dom";
import "../../App.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="mx-auto mt-4 p-4 flex-grow">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
