import React, { useState, useEffect, useContext } from "react";
import Scheduale from "./Scheduale";
import Login from "./Login";
import { UserContext } from "../App";

function Home() {
  const {loggedin, setLoggedIn} =useContext(UserContext)

  useEffect(() => {
    const student = localStorage.getItem("student_id");
    if (student) setLoggedIn(true);

    return () => {};
  }, []);

  return <div>{loggedin ? <Scheduale /> : <Login setLoggedIn={setLoggedIn} />}</div>;
}

export default Home;
