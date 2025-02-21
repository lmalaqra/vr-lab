const { Student } = require("../models/Students");

module.exports = class {
  async createMMultipleStudents(students) {
    return await Student.insertMany(students);
  }

  async createStudent(student) {
    return await Student.create(student);
  }

  async findStudentByGroup(group) {
    return await Student.find({ group });
  }

  async findStudentById(student_id) {
    return await Student.findOne({ student_id });
  }

  async deleteStudent(student_id) {
    return await Student.deleteOne({ student_id });
  }

  async updateAttendece(student_ids) {
    return await Student.updateMany(
      { student_id: { $in: student_ids } },
      { $inc: { attend: 1 } }
    );
  }
};
