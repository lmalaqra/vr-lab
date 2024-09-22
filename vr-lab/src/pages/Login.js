import React, { useState } from "react";
import axios from "axios";
import { redirect } from "react-router-dom";

function Login({  setLoggedIn }) {
  const [student_id, setStudent_id] = useState("");
  const [error,setError]=useState(false)
  const submitForm = async (e) => {
    e.preventDefault()
    try {
      const student = await axios.get(
        process.env.REACT_APP_BASE_URL + `/student?student_id=${student_id}`
      ).then(res=>res.data);

      localStorage.setItem('student_id',student.student_id)
      setLoggedIn(true);
      redirect('/')
    } catch (e) {
        console.log(e)
        setError(true)
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
          className="focus:outline-none border border-b-2 m-4 placeholder:font-sans placeholder:p-2 head px-2 py-1 "
          type="text"
          value={student_id}
          onChange={(e) => {
            setStudent_id(e.target.value);
          }}
          placeholder="Student ID"
        />
        <button className="mt-6 bg-blue-700 text-white px-2 py-1 head" type="submit">
          {" "}
          Submit{" "}
        </button>
        <div className={`absolute bottom-0 w-full ${!error && 'h-0' } `}>
         <div className={` bg-red-600 overflow-hidden font-sans text-black  py-2 px-1 transition-all `}>
         The Student ID You entered is not valid
</div>
</div>
      </form>
    </div>
  );
}

export default Login;
