import React from "react";
import Base from "../core/Base";

const ManageCategories = () => {
  return (
    <Base
      title="manage categories"
      description="a page to manage all you tshirts"
      className="container bg-success p-4"
    >
      <div className="row bg-dark rounded">
        <div className="col-md-4 text-center p-4">
          <p className="text-warning">data</p>
          {/* <p className="text-center text-white">{JSON.stringify(name)}</p> */}
        </div>

        <div className="col-md-8  p-4">data</div>
      </div>
    </Base>
  );
};

export default ManageCategories;
