import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Admin from "./pages/Admin";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/adminnotsecure",
    element: <Admin/>,
  },
]);

function App() {
  return (
    <div className="App ">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
