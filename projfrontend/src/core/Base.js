import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css";

import Footer from "./components/Footer";
import Header from "./components/Header";
import NavBar from "./components/NavBar";

const Base = ({
  title = "My Title",
  description = "My Description",
  className = "bg-dark text-=white p-4",
  children,
}) => {
  return (
    <div>
      <NavBar />
      <div className="container-fluid">
        <Header hTitle={title} hDesc={description} />

        <div className={className}> {children} </div>
      </div>

      <Footer />
    </div>
  );
};

export default Base;
