import React from "react";
import { Outlet } from "react-router-dom";

const Homelayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Homelayout;
