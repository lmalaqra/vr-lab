import React, { useState, useEffect } from "react";
import Scheduale from "./Scheduale";
import Login from "./Login";

function Home() {
  const [loggedin, setLoggedIn] = useState(false);

  useEffect(() => {
    const student = localStorage.getItem("student_id");
    if (student) setLoggedIn(true);

    return () => {};
  }, []);

  return <div>{loggedin ? <Scheduale /> : <Login setLoggedIn={setLoggedIn} />}</div>;
}

export default Home;
