const csv = require("csvtojson");
const StudentsServices = require("../services/studentService");
const studentservices = new StudentsServices();

module.exports = class {
  async createStudentsFromFile(req, res, next) {
    try {
      const students = await csv().fromFile(req.file.path);

      const group = req.body.group;
      const modStudents = [...students].map((el) => ({
        ...el,
        group: req.body.group,
      }));

      const createdStudents = await studentservices.createMMultipleStudents(
        modStudents
      );
      res.json(createdStudents);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async getStudent(req, res, next) {
    try {
      const { student_id } = req.query;
      const student = await studentservices.findStudentById(student_id);
      if (!student) throw new Error("You are not registered");
      res.json(student);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async createStudent(req, res, next) {
    const { student_id, group, name } = req.body;
    const email = `s${student_id}@stu.najah.edu`;
    const created_student = { student_id, group, name, email };
    try {
      const student = await studentservices.createStudent(created_student);
      res.json(student);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
  async deleteStudent(req, res, next) {
    const { student_id } = req.query;

    try {
      await studentservices.deleteStudent(student_id);
      res.send("sucess");
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
};
