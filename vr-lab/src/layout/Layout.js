import React from "react";

function Layout({ children }) {
  return (
    <div>
      <div className="w-full shadow-sm flex justify-center p-4 head bg-white opacity-80" >
        <h1 className="head font-bold text-2xl tracking-wider opacity-100">Virtualy Reality Simulation Labs</h1>
        
      </div>
      <div>{children}</div>
    </div>
  );
}

export default Layout;
