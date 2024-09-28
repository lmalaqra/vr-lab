const StudentController = require("../controllers/studentController");
const studentController = new StudentController();

const router = require("express").Router();

router
  .route("/")
  .get(studentController.getStudent)
  .post(studentController.createStudentsFromFile)
  .put(studentController.createStudent).delete(studentController.deleteStudent);

module.exports = router;
