const Session = require("../models/Session");
const { Student } = require("../models/Students");

module.exports = class {
  async createSessions(sessions) {
    return await Session.insertMany(sessions);
  }

  async findSessionById(_id) {
    return await Session.findById({ _id });
  }

  async removeStudentFromSession(student_id) {
    return await Session.findOneAndUpdate(
      { "students.student_id": student_id },
      { $pull: { students: { student_id } } }
    );
  }
  async clearBooking(session_id) {
    return await Session.findOneAndUpdate(
      { session_id },
      {
        $set: { students: [] },
      }
    );
  }

  async findAllSessions(group) {
    return await Session.aggregate([
      { $match: { group } },
      {
        $group: {
          _id: { date: "$date" },
          sessions: {
            $push: {
              _id: "$_id",
              session_id: "$session_id",
              group: "$group",
              start: "$start",
              end: "$end",
              length: "$length",
              students: "$students",
              max_number: "$max_number",
            },
          },
        },
      },
      { $sort: { date: -1, "sessions.session_id": 1 } },
    ]);
  }

  async getStudentSession(student_id) {
    return await Session.findOne({ "students.student_id": student_id });
  }

  async getSessionsByDate(day) {
    return await Session.find({ day,group:"2",isDeleted:false }).sort({ session_id: 1 });
  }

  async updateAttendece(student_ids) {
    return await Student.updateMany(
      { student_id: { $in: student_ids } },
      { $inc: { attend: 1 } }
    );
  }
  async endSeesion(_id) {
    return await Session.updateOne({ _id }, { isDeleted: true });
  }
};
