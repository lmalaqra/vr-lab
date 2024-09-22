const SessionServices = require("../services/sessionServices");
const sessionServices = new SessionServices();
const StudentServices = require("../services/studentService");
const studentService = new StudentServices();
const schedualer = require("../helpers/helper");

module.exports = class {
  async createSessions(req, res, next) {
    try {
      const availableHours = {
        Monday: [
          { start: "08:00", end: "12:00" },
          { start: "14:00", end: "15:30" },
        ],
        Tuesday: [
          { start: "8:00", end: "12:00" },
          { start: "14:00", end: "15:30" },
        ],
        Wednesday: [{ start: "08:00", end: "12:00" }],
        Thursday: [{ start: "08:00", end: "15:30" }],
        Friday: [],
        Saturday: [],
        Sunday: [],
      };

      const { start_date, group, session_duration } = req.body;

      const students = await studentService.findStudentByGroup(group);
      const ttal_shift = 5;
      const sched = schedualer(
        availableHours,
        session_duration,
        ttal_shift,
        start_date
      );
      const schedule = await sessionServices.createSessions(
        [...sched].map((el) => ({ ...el, group }))
      );
      res.json(schedule);
    } catch (e) {
      console.log(e);
      next(e)
    }
  }

  async bookSession(req, res) {
    try {
      const { student_id, session_id } = req.body;
      console.log(req.body);
      const student = await studentService.findStudentById(student_id);
      console.log(student);
      if (!student) throw new Error("student not found ");
      const isRegistered = await sessionServices.getStudentSession(student_id);
      if (isRegistered) throw new Error("YOu are already registered");
      const session = await sessionServices.findSessionById(session_id);
      if (session.students.length === 5)
        throw new Error("This session is fully booked ");
      const studentFound = session.students.find(
        (el) => el.student_id == student_id
      );
      if (studentFound) throw new Error("You are already registerd ");
      session.students.push(student);
      await session.save();
      res.json(session);
    } catch (e) {
      console.log(e);
      next(e)
    }
  }

  async changeAppintment(req, res, next) {
    try {
      const { student_id, session_id } = req.body;

      await sessionServices.removeStudentFromSession(student_id);
      const student = await studentService.findStudentById(student_id);
      const NewSession = await sessionServices.findSessionById(session_id);

      if (NewSession.students.length === 5)
        throw new Error("This session is fully booked");
      NewSession.students.push(student);
      await NewSession.save();

      res.json(NewSession);
    } catch (e) {
      console.log(e);
      next(e)
    }
  }

  async clearBooking(req, res, next) {
    try {
      const { session_id } = req.body;

      const session = sessionServices.clearBooking(session_id);
      res.json(session);
    } catch (e) {
      console.log(e);
      next(e)
    }
  }

  async getSessions(req, res, next) {
    try {
      const sessions = await sessionServices.findAllSessions();
      res.json(sessions);
    } catch (e) {
      console.log(e);
      next(e)
    }
  }

  async getStudentSession(req, res, next) {
    try {
      const { student_id } = req.query;
      const session = await sessionServices.getStudentSession(student_id);
      const student = await studentService.findStudentById(student_id);
      res.json({ student, session });
    } catch (e) {
      console.log(e);
      next(e)
    }
  }
};
