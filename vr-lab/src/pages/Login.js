import React, { useState } from "react";
import axios from "axios";
import { redirect } from "react-router-dom";

function Login({ setLoggedIn }) {
  const [registered, setRegistred] = useState(1);
  const [student_id, setStudent_id] = useState("");
  const [password1, setPassword] = useState({ password: "", password2: "" });
  const [error, setError] = useState({ isError: false, msg: "" });
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      if (registered === 1) {
        const student = await axios
          .get(
            process.env.REACT_APP_BASE_URL + `/student?student_id=${student_id}`
          )
          .then((res) => res.data);
          console.log(!student.password)
          if (!student.password) setRegistred(3);
          else setRegistred(2);
      } else if (registered === 2) {
        const student = await axios
          .patch(
            process.env.REACT_APP_BASE_URL +
              `/student?registered=${registered === 2 ? true : false}`,
            { student_id, password: password1.password }
          )
          .then((res) => res.data);
        localStorage.setItem("student_id", student.student_id);
        localStorage.setItem('group',student.group)
        setLoggedIn(true);
      } else {
        if (password1.password === password1.password2) {
          const student = await axios
            .patch(
              process.env.REACT_APP_BASE_URL +
                `/student?registered=${registered === 2 ? true : false}`,
              { student_id, password: password1.password }
            )
            .then((res) => res.data);
          localStorage.setItem("student_id", student.student_id);
        localStorage.setItem('group',student.group)

          setLoggedIn(true);
        } else {
          setError({ isError: true, msg: "Password doesnt match" });
        }
      }
    } catch (e) {
      console.log(e);
      registered === 1 &&
        setError({
          isError: true,
          msg: "The student ID you entered is not valid , please contact your supervisor",
        });
      (registered === 2 || registered === 3) &&
          setError({ isError: true, msg: "Wrong password " });
    }
  };

  return (
    <div className="flex justify-center items-center mx-auto p-10">
      <form
        onSubmit={submitForm}
        className="flex flex-col items-center gap  w-5/6 shadow-lg py-20 px-8 relative overflow-hidden bgg "
      >
        <img src="./najah.png" className="w-20 h-20 mb-10" />

        <label className="head"> Please Enter Your Student ID </label>
        <input
          disabled={registered!==1?true:false}
          className="focus:outline-none border border-b-2 m-4 placeholder:font-sans placeholder:p-2 head px-2 py-1 disabled:bg-slate-300 "
          type="text"
          value={student_id}
          onChange={(e) => {
            setStudent_id(e.target.value);
          }}
          placeholder="Student ID"
        />
        {registered !== 1 && (
          <div >
            <label className="head"> Password </label>
            <input
              className="focus:outline-none border border-b-2 m-4 placeholder:font-sans placeholder:p-2 head px-2 py-1 disabled:bg-slate-300 "
              type="password"
              value={password1.password}
              name="password"
              onChange={(e) => {
                setPassword((prev) => ({ ...prev, password: e.target.value }));
              }}
              placeholder="Password"
            />
            {registered === 3 && (
              <div>
                {" "}
                <label className="head"> Confirm Password </label>
                <input
                  className="focus:outline-none border border-b-2 m-4 placeholder:font-sans placeholder:p-2 head px-2 py-1 disabled:bg-slate-300 "
                  type="password"
                  value={password1.password2}
                  name="password"
                  onChange={(e) => {
                    setPassword((prev) => ({
                      ...prev,
                      password2: e.target.value,
                    }));
                  }}
                  placeholder="confirm Password"
                />
              </div>
            )}
          </div>
        )}
        <button
          className="mt-6 bg-blue-700 text-white px-2 py-1 head"
          type="submit"
        >
          {" "}
          {registered === 1
            ? "Continue"
            : registered === 2
            ? "Login"
            : "Register"}{" "}
        </button>
        <div className={`absolute bottom-0 w-full ${!error && "h-0"} `}>
          <div
            className={` bg-red-600 overflow-hidden font-sans text-black  py-2 px-1 transition-all `}
          >
            {error.msg}
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
