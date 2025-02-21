const mongoose = require("mongoose");

const studentScehma = new mongoose.Schema({
  student_id:String,
  name:String,
  group:String || Number,
  email:String,
  password:String,
  residence:String,
  attend:{type:Number,default:0}
  
 
});

const Student = mongoose.model("student", studentScehma);

module.exports = {Student,studentScehma};
