import React from "react";

const Header = ({ hTitle = "My Title", hDesc = "My Description" }) => {
  return (
    <div className="jumbotron bg-dark text-white text-center">
      <h2 className="display-2 text-uppercase py-2"> {hTitle} </h2>
      <p className="lead text-capitalize py-2">
        <i>{hDesc}</i>{" "}
      </p>
    </div>
  );
};

export default Header;
