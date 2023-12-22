import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="mx-auto text-center w-fit mt-12 p-4 rounded-md   ">
      <h1>Error 404</h1>
      <h2>Page not found</h2>
      <p className="mb-2">Sorry we can't find the page you are looking for</p>
      <Link
        to="/"
        className=" bg-indigo-500 p-1 rounded-md text-slate-50 hover:bg-indigo-700 duration-300"
      >
        back home
      </Link>
    </div>
  );
};

export default Error;
