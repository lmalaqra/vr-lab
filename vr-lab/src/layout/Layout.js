import React, { useContext } from "react";
import { UserContext } from "../App";

function Layout({ children }) {
  const logout =()=>{
    localStorage.removeItem('student_id')
    setLoggedIn(false)
  }

  const {loggedin, setLoggedIn} =useContext(UserContext)
  return (
    <div>
      <div className="w-full shadow-sm flex justify-center p-4 head bg-white opacity-80 relative" >
        <h1 className="head font-bold text-2xl tracking-wider opacity-100">Department of Oral Medicine & Diagnosis</h1>{loggedin?
        <div className="right-4 absolute flex items-center"><div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div><span onClick={logout} className="cursor-pointer underline">Signout</span></div>
        :<></>}
      </div>
      <div>{children}</div>
    </div>
  );
}

export default Layout;
