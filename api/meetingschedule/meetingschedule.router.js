const { 
    createMeetingSchedule,
    getAllMeetingSchedules,
    getMeetingSchedulesByOrganizerId,
    getMeetingSchedulesByParticipantId,
    getMeetingSchedulesByTitle,
    getMeetingSchedulesByUserId,
    updateMeetingSchedule,
    deleteMeetingSchedule
} = require("./meetingschedule.controller");

const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/create", createMeetingSchedule);
router.get("/", getAllMeetingSchedules);
router.get("/search/organizerId/:organizerId", getMeetingSchedulesByOrganizerId);
router.get("/search/participantId/:participantId", getMeetingSchedulesByParticipantId);
router.get("/search/title/:title", getMeetingSchedulesByTitle);
router.get("/search/userId/:userId", getMeetingSchedulesByUserId);
router.patch("/update", updateMeetingSchedule);
router.patch("/delete", deleteMeetingSchedule);

module.exports = router;