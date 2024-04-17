import React from "react";
import "./Layout.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Layout = ({ children }) => {
  return (
    <>
      <div className="layout">
        <Navbar />
        <br />
        <br />
        <main>{children}</main>
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>

      <Footer />
    </>
  );
};

export default Layout;
