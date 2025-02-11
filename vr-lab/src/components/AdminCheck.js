import React, { useState } from "react";

function AdminCheck({ name, student_id, setattendingStudents }) {
  const [checked, setChecked] = useState(false);
  const handleInpt = (e) => {
    setChecked(!checked);
    !checked && setattendingStudents((prev) => [...prev, student_id]);
    checked &&
      setattendingStudents((prev) => prev.filter((el) => el !== student_id));
  };
  return (
    <div className="shadow-sm  hover:bg-slate-400 px-4 flex justify-evenly items-center">
      <h1>{name}</h1>
      <h1>{student_id}</h1>
      <input onChange={handleInpt} type="checkbox" checked={checked} />
    </div>
  );
}

export default AdminCheck;
