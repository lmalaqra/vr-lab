import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminCheck from "../components/AdminCheck";

function Admin() {
  const [data, setData] = useState([]);
  const [session, setSession] = useState("");
  const [attendingStudents, setattendingStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const getDayName = (date) => {
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu"];
    const day = new Date(date).getDay();
    return weekDays[day];
  };
  const dayFullName = () => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const day = new Date().getDay();
    return daysOfWeek[day];
  };

  useEffect(() => {
    const fetchData = async () => {
      var today = new Date("2025-02-16");
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();

      // const date = yyyy + "-" + mm + "-" + dd;
      const date = "2024-12-29";

      try {
        const sessions = await axios
          .get(process.env.REACT_APP_BASE_URL + `/session/admin?day=` + dayFullName())
          .then((res) => res.data);
        setData(sessions);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const submitAttend = async () => {
    try {
      if(attendingStudents.length===0)return

      setLoading(true);
      await axios
        .patch(process.env.REACT_APP_BASE_URL + `/session/admin`, {
          student_ids: attendingStudents,
          _id: session._id,
        })
        .then((res) => res.data);

      const sessions = await axios
        .get(process.env.REACT_APP_BASE_URL + `/session/admin?day=Sunday`)
        .then((res) => res.data);
      setData(sessions);
      setLoading(false);
      setattendingStudents([]);
      setSession("");
    } catch (e) {}
  };
  return (
    <div>
      {!data || data.length === 0 ? (
        <div>There is no Session Today</div>
      ) : (
        <div>
          <h1 className="head text-center text-2xl py-6">Todays' Sessions </h1>
          <div className="flex ">
            {session && (
              <div className="bg-white  py-2 flex flex-col gap-2 relative w-1/6">
                <button
                  onClick={() => {
                    setSession("");
                  }}
                  className="absolute top-0 right-0 text-lg text-red-600 font-bold"
                >
                  X
                </button>
                <h1 className="head text-center tracking-wide">Students</h1>
                <h1 className="text-center font-bold border-b ">
                  {session.start + "-" + session.end}
                </h1>
                {session.students.map((e) => (
                  <AdminCheck
                    name={e.name}
                    student_id={e.student_id}
                    setattendingStudents={setattendingStudents}
                  />
                ))}
                <button onClick={submitAttend} disabled={loading} className="bg-blue-600 text-white px-2 rounded-sm text-center mx-auto">
                  Submit
                </button>
              </div>
            )}
            <div className="w-1/6 mx-auto flex flex-col gap-3">
              {data.map((e) => (
                <div>
                  <div
                    onDoubleClick={() => {
                      setSession("");
                    }}
                    onClick={() => {
                      setSession(e);
                    }}
                    className={`border border-blue-700  shadow-md w-full flex flex-col px-4 gap-2 bg-slate-50 hover:scale-105 hover:cursor-pointer `}
                  >
                    <div className="h-5 w-5 bg-green-500 rounded-b-md px-4"></div>
                    <h1 className="head">{getDayName(e.date)}</h1>
                    <h1 className="head"> {e.start + "-" + e.end}</h1>
                    <h1 className="text-sm">
                      Registered : {e.students.length}
                    </h1>
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
