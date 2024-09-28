import React, { useState, useEffect } from "react";
import axios from "axios";

function Admin() {
  const [data, setData] = useState([]);
  const [session,setSession]=useState('')

  const getDayName = (date) => {
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu"];
    const day = new Date(date).getDay();
    return weekDays[day];
  };


  useEffect(() => {
    const fetchData = async () => {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();

      // const date = yyyy + "-" + mm + "-" + dd;
      const date = "2024-09-25";


      try {
        const sessions = await axios
          .get(process.env.REACT_APP_BASE_URL + `/session/admin?date=${date}`)
          .then((res) => res.data);
        setData(sessions);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {!data || data.length===0 ? (
        <div>There is no Session Today</div>
      ) : (
        <div > 
          <h1 className="head text-center text-2xl py-6">Todays' Sessions </h1>
          <div className="flex ">
          {session && 
          <div className="bg-white  py-2 flex flex-col gap-2 relative">
          <button onClick={()=>{
            setSession("")
          }} className="absolute top-0 right-0 text-lg text-red-600 font-bold">X</button>
          <h1 className="head text-center tracking-wide">Students</h1>
          <h1 className="text-center font-bold border-b ">{session.start +"-" + session.end}</h1>
          {session.students.map(e=><div className="shadow-sm  hover:bg-slate-400 px-4">
            <h1>{e.name}</h1>
            <h1>{e.student_id}</h1>
          </div>)}
            
          </div>}
          <div className="w-1/6 mx-auto flex flex-col gap-3">
            {data.map((e) => (
              <div>
                <div
                onDoubleClick={()=>{
                  setSession("")
                }}
                  onClick={() => {setSession(e)}}
                  className={`border border-blue-700  shadow-md w-full flex flex-col px-4 gap-2 bg-slate-50 hover:scale-105 hover:cursor-pointer `}
                >
                  <div className="h-5 w-5 bg-green-500 rounded-b-md px-4"></div>
                  <h1 className="head">{getDayName(e.date)}</h1>
                  <h1 className="head"> {e.start + "-" + e.end}</h1>
                  <h1 className="text-sm">Registered : {e.students.length}</h1>
                </div>
              </div>
            ))}
            
          </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
