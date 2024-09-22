import React, { useState, useEffect } from "react";
import axios from "axios";
import "./sched.css";
import Bookingviewr from "../components/Bookingviewr";

function Scheduale() {
  const findSession = (sessions, shownsessions) => {
    const day = sessions.find((el) => el._id.date === showSessions);
    const daysession = [...day.sessions].filter((e) => e.students.length < 5);
    return daysession;
  };

  const [booked, setBooked] = useState(false);
  const [changeActive, setChangeActive] = useState(false);
  const [request, setRequest] = useState({
    laoding: false,
    error: false,
    done: false,
  });
  const [sessions, setsessions] = useState([]);
  const [showSessions, setShowSessions] = useState("");
  const getDayName = (date) => {
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu"];
    const day = new Date(date).getDay();
    return weekDays[day];
  };
  const [selectedSession, setSelectedSession] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const session = await axios
          .get(process.env.REACT_APP_BASE_URL + "/session")
          .then((res) => res.data);
        setsessions(session);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);
  const book = async () => {
    const student_id = localStorage.getItem("student_id");

    try {
      setRequest((prev) => ({ ...prev, loading: true }));
      const bookedSession = await axios
        .put(process.env.REACT_APP_BASE_URL + "/session", {
          session_id: selectedSession,
          student_id,
        })
        .then((res) => res.data);
      setRequest((prev) => ({
        ...prev,
        done: true,
        loading: false,
        error: false,
      }));
      window.location.reload();
    } catch (e) {
      console.log(e);
      setRequest((prev) => ({
        ...prev,
        done: false,
        loading: false,
        error: true,
      }));
    }
  };

  const changeBooking = async () => {
    const student_id = localStorage.getItem("student_id");

    try {
      setRequest((prev) => ({ ...prev, loading: true }));
      const bookedSession = await axios
        .patch(process.env.REACT_APP_BASE_URL + "/session", {
          session_id: selectedSession,
          student_id,
        })
        .then((res) => res.data);
      setRequest((prev) => ({
        ...prev,
        done: true,
        loading: false,
        error: false,
      }));
      window.location.reload();
    } catch (e) {
      console.log(e);
      setRequest((prev) => ({
        ...prev,
        done: false,
        loading: false,
        error: true,
      }));
    }
  };

  return (
    <div>
      <h1 className="text-center head mt-4 text-lg tracking-wide"> Please chose An appiontment </h1>
      <h3 className="text-center font-serif w-3/6 mx-auto ">
        **Make sure that the appointment doesn't interfere with other lectures or
        labs
      </h3>
      <Bookingviewr
        setBooked={setBooked}
        booked={booked}
        setChangeActive={setChangeActive}
      />

      <div className=" px-4 w-full py-10 px-0">
        <h1 className="head text-center tracking-wider">Chose the Day</h1>

        {!sessions ? (
          <div></div>
        ) : (
          <div className="flex gap-x-1 text-base justify-center hover:cursor-pointer   mx-auto overflow-hidden flex-wrap">
            {sessions.map((el) => (
              <div
                onClick={() => {
                  setShowSessions(el._id.date);
                }}
                onDoubleClick={() => {
                  setShowSessions("");
                }}
                className="flex flex-col  justify-start hover:scale-110 w-2/5  text-base py-1"
              >
                <div className="bg-blue-700 text-white text-center mb-7">
                  <h1 className="font-bold">
                    {el._id.date.split("-")[2] +
                      "/" +
                      el._id.date.split("-")[1]}
                  </h1>
                  <h1 className="font-bold">{getDayName(el._id.date)}</h1>
                </div>
                <div></div>
              </div>
            ))}
          </div>
        )}
        {showSessions && !booked && (
          <div>
            {" "}
            <div className="text-center head mb-4">Pick the Time</div>
            <div className="flex flex-col justify-center items-center text-center gap-6">
              {findSession(sessions, showSessions).map((e, i) => (
                <div>
                  <div
                    onClick={() => {
                      setSelectedSession(e.session_id);
                    }}
                    className={`${
                      selectedSession === e.session_id &&
                      "border border-blue-700 "
                    } shadow-md w-full flex flex-col px-4 gap-2 bg-slate-50 hover:scale-105 hover:cursor-pointer `}
                  >
                    <div className="h-5 w-5 bg-green-500 rounded-b-md px-4"></div>
                    <h1 className="head">{getDayName(showSessions)}</h1>
                    <h1 className="head"> {e.start + "-" + e.end}</h1>
                    <h1 className="text-sm">
                      Registered : {e.students.length}
                    </h1>
                    {selectedSession === e.session_id && (
                      <button
                        onClick={() => {
                          if (changeActive) changeBooking();
                          else book();
                        }}
                        disabled={request.laoding}
                        className="bg-blue-700 text-white rounder-sm mb-2 py-1 px-2 table-header-group tracking-wider transition-all motion-reduce:animate-bounce"
                      >
                        Register{" "}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Scheduale;
