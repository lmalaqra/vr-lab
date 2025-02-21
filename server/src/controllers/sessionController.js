const SessionServices = require("../services/sessionServices");
const sessionServices = new SessionServices();
const StudentServices = require("../services/studentService");
const studentService = new StudentServices();
const schedualer = require("../helpers/helper");

module.exports = class {
  async createSessions(req, res, next) {
    try {
     /* The `availableHours` object defines the working hours for each day of the week. Each day has an
     array with an object specifying the start and end time of the available hours. */
      // const availableHours = {
      //   Sunday: [{ start: "08:00", end: "15:00" }],
      //   Monday: [{ start: "08:00", end: "15:00" }],
      //   Tuesday: [{ start: "08:00", end: "15:00" }],
      //   Wednesday: [{ start: "08:00", end: "15:00" }],
      //   Thursday: [{ start: "08:00", end: "15:00" }],

      //   Friday: [], 
      //   Saturday: [],
       

        
      // };
      const availableHours = {
        Sunday: [{ start: "08:00", end: "14:00" }],
        Monday: [{ start: "08:00", end: "14:00" }],
        Tuesday: [{ start: "08:00", end: "14:00" }],
        Wednesday: [{ start: "08:00", end: "14:00" }],
        Thursday: [{ start: "08:00", end: "14:00" }],

        Friday: [], 
        Saturday: [],
       

        
      };
      const { start_date, session_duration,max_number,group } = req.body;

      const totalShifts = 15; // Change this number to test different cases
      const sched = schedualer(
        availableHours,
        session_duration,
        totalShifts,
        start_date, max_number,group
      );
      console.log(sched);
      const schedule = await sessionServices.createSessions(sched);
      res.json(schedule);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async bookSession(req, res,next) {
    try {
      const { student_id, _id } = req.body;
      console.log(req.body);
      const student = await studentService.findStudentById(student_id);
      console.log(student);
      if (!student) throw new Error("student not found ");
      const isRegistered = await sessionServices.getStudentSession(student_id);
      if (isRegistered) throw new Error("YOu are already registered");
      const session = await sessionServices.findSessionById(_id);
      if (session.students.length === session.max_number)
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
      next(e);
    }
  }

  async changeAppintment(req, res, next) {
    try {
      const { student_id, _id } = req.body;

      await sessionServices.removeStudentFromSession(student_id);
      const student = await studentService.findStudentById(student_id);
      const NewSession = await sessionServices.findSessionById(_id);

      if (NewSession.students.length === NewSession.max_number)
        throw new Error("This session is fully booked");
      NewSession.students.push(student);
      await NewSession.save();

      res.json(NewSession);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async clearBooking(req, res, next) {
    try {
      const { _id } = req.body;

      const session = sessionServices.clearBooking(_id);
      res.json(session);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async getSessions(req, res, next) {
    try {
      const {group} = req.query
      const sessions = await sessionServices.findAllSessions(group);
      res.json(sessions);
    } catch (e) {
      console.log(e);
      next(e);
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
      next(e);
    }
  }

  async getSessionsByDate(req, res, next) {
    try {
      const { day } = req.query;
      const sessions = await sessionServices.getSessionsByDate(day);
      res.json(sessions);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async deleteStudentBooking(req, res, next) {
    try {
      const { student_id } = req.query;
      await sessionServices.removeStudentFromSession(student_id);
      res.status(200).send("sucess");
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
  async attendence(req, res, next) {
    const { student_ids, _id } = req.body;
    try {
      const session = await sessionServices.findSessionById(_id)
      if(session.isDeleted)throw new Error('Attendence already taken ')
      await sessionServices.updateAttendece(student_ids);
      await sessionServices.endSeesion(_id);
      res.status(200).send("success");
    } catch (e) {
      next(e);
    }
  }
};
