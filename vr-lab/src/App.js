import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Admin from "./pages/Admin";
import { useState, useEffect, createContext } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Layout from "./layout/Layout";
export const UserContext=createContext(null)

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
  const [loggedin, setLoggedIn] = useState(false);

  return (
    <div className="App ">
      <UserContext.Provider value={{loggedin,setLoggedIn}}>
      <Layout>
      <RouterProvider router={router} />
      </Layout>
      </UserContext.Provider>
    </div>
  );
}

export default App;
