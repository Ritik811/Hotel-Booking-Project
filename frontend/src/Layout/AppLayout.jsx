import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AppLayout = () => {
  return (
    <>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <Outlet />
      <Footer />
    </>
  );
};
