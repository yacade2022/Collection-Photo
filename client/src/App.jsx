import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./page/Login";
import Register from "./page/Register";
import Collection from "./page/Collection";
import Homelayout from "./page/Homelayout";
import Error from "./page/Error";
import { action as registerAction } from "./page/Register";
import { action as logineAction } from "./page/Login";
import { action as collectAction } from "./page/Collection";
import { loader as loaderCollection } from "./page/Collection";
import { action as deleteAction } from "./page/DeleteImage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homelayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Register />, action: registerAction },
      {
        path: "login",
        element: <Login />,
        action: logineAction,
      },
      {
        path: "collection",
        element: <Collection />,
        action: collectAction,
        loader: loaderCollection,
      },
      {
        path: "delete/:id",
        action: deleteAction,
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
