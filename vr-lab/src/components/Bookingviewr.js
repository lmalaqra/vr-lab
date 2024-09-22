import axios from "axios";
import React, { useState, useEffect } from "react";

function Bookingviewr({ setBooked, booked, setChangeActive }) {
  const [data, setData] = useState([]);
  const getDayName = (date) => {
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu"];
    const day = new Date(date).getDay();
    return weekDays[day];
  };

  useEffect(() => {
    const fetchData = async () => {
      const student_id = localStorage.getItem("student_id");
      try {
        const result = await axios
          .get(
            process.env.REACT_APP_BASE_URL +
              `/session/student?student_id=${student_id}`
          )
          .then((res) => res.data);
        console.log(result);
        setData(result);
        if (result.session) setBooked(true);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="my-6 ">
      {!data.session ? (
        <div></div>
      ) : (
        <div className="w-4/6 mx-auto text-center shadow-md pb-2 bgg">
          <h1 className="head bg-blue-900 text-white tracking-wider ">
            Your Session{" "}
          </h1>
          <h1>{data.student.name}</h1>
          <h1>{data.student.student_id}</h1>
          <h1 className="head">
            {" "}
            <span className="head"> {getDayName(data.session.date)} </span>
            <span>
              {data.session.date.split("-")[2] +
                "/" +
                data.session.date.split("-")[1]}
            </span>
          </h1>
          <h1 className="head">
            {data.session.start + "-" + data.session.end}
          </h1>
          {booked ? (
            <button
              onClick={() => {
                setBooked(!booked);
                setChangeActive((prev) => !prev);
              }}
              className="bg-red-600 text-white px-2 my-2"
            >
              Change Appointment
            </button>
          ) : (
            <button
              onClick={() => {
                setBooked(!booked);
                setChangeActive((prev) => !prev);
              }}
              className="bg-black text-white px-2 my-2"
            >
              Cancel
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Bookingviewr;
