import React from "react";

const Footer = () => {
  return (
    <footer className="footer bg-dark mt-auto py-3">
      <div className="container-fluid bg-success text-white text-center py-3">
        <span>
          If you got any questions, feel free to reach out
          <span className="px-2">
            <button className="btn btn-outline-warning">Contact Us</button>
          </span>
        </span>
      </div>

      <div className="container text-center py-2">
        <span className="text-muted">
          An amaizing site to buy tshirts built with{" "}
          <span className="text-white">MERN</span> stack
        </span>
      </div>
    </footer>
  );
};

export default Footer;
