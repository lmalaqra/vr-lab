const mongoose = require("mongoose");
const { studentScehma } = require("./Students");

const sessionSchema = new mongoose.Schema({
  session_id:  Number ,
  group: String,
  date: String,
  length: Number,
  start: String,
  end: String,
  students: [studentScehma],
});

module.exports = mongoose.model("session", sessionSchema);
