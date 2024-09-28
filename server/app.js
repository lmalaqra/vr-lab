require("dotenv").config();
require("./config/database").connect();
const csv = require("csvtojson");
const sched = require("./src/helpers/helper");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const studentRoutes = require("./src/routes/studentRoute");
const sessionRoutes = require("./src/routes/sessionRoutes");
const path = require("path");
const { Student } = require("./src/models/Students");

const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.resolve(__dirname, "../vr-lab/build")));
var upload = multer({ dest: "uploads/" });

app.use("/student", upload.single("students"), studentRoutes);
app.use("/session", sessionRoutes);

// 
app.use((err, req, res, next) => {
  console.log(err);
  res.status(400).send("Something broke!");
});

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../vr-lab/build/index.html"));
});
// console.log(sched)





// app.post("/uploadStudents", upload.single("students"), async (req, res) => {
  //   try {
  //     const jsonArray = await csv().fromFile(req.file.path);
  //     const student_ids = jsonArray.map((e) => e.student_id);
  
  //     const students = await Student.deleteMany({ student_id: { $nin: student_ids } });
  //     res.json(students);
  //     console.log(students.length);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // });

module.exports = app;
