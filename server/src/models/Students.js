const mongoose = require("mongoose");

const studentScehma = new mongoose.Schema({
  student_id:String,
  name:String,
  group:String || Number,
  email:String
});

const Student = mongoose.model("student", studentScehma);

module.exports = {Student,studentScehma};
