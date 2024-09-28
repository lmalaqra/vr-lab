const Session = require("../models/Session");

module.exports = class {
  async createSessions(sessions) {
    return await Session.insertMany(sessions);
  }

  async findSessionById(session_id) {
    return await Session.findOne({ session_id });
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

  async findAllSessions() {
    return await Session.aggregate([
      {
        $group: {
          _id: { date: "$date" },
          sessions: {
            $push: {
              session_id: "$session_id",
              group: "$group",
              start: "$start",
              end: "$end",
              length: "$length",
              students: "$students",
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

  async getSessionsByDate(date){


    return await Session.find({date}).sort({session_id:1})
  }
};
