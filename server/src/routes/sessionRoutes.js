const router = require("express").Router();
const SessionContoller = require("../controllers/sessionController");
const sessionController = new SessionContoller();

router
  .route("/")
  .get(sessionController.getSessions)
  .post(sessionController.createSessions)
  .put(sessionController.bookSession)
  .patch(sessionController.changeAppintment)
  .delete(sessionController.clearBooking);


  router.route('/student').get(sessionController.getStudentSession).delete(sessionController.deleteStudentBooking).put(sessionController.attendence)
  router.route('/admin').get(sessionController.getSessionsByDate)
  
  
module.exports = router;
