import React from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";

const Body = () => {
  return (
    <div className="bg-zinc-800 h-screen text-white">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
