const { 
    createMeetingSchedule,
    getAllMeetingSchedules,
    getMeetingSchedulesByOrganizerId,
    getMeetingSchedulesByParticipantId,
    getMeetingSchedulesByTitle,
    getMeetingSchedulesByUserId,
    updateMeetingSchedule,
    deleteMeetingSchedule,
    getConfirmedMeetingSchedules
} = require("./meetingschedule.controller");

const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

// ------------ tạo một meeting
router.post("/create", createMeetingSchedule);
//-----------------------------------------

// router.get("/", getAllMeetingSchedules);

// ------------- GET LIST OF MEETINGS ------------

//------------- lấy các meeeting mà userId là người tạo
router.get("/search/organizer/:userId", getMeetingSchedulesByOrganizerId);
//-----------------------------------------

//------------- lấy các meeeting mà userId là người tham gia
router.get("/search/participant/:userId", getMeetingSchedulesByParticipantId);
//-----------------------------------------

//------------- lấy các meeeting theo tên
router.get("/search/title", getMeetingSchedulesByTitle);
//-----------------------------------------

//------------- lấy các meeeting mà userId là người tạo hoặc người tham gia
router.get("/search/user/:userId", getMeetingSchedulesByUserId);
//-----------------------------------------

//------------- lấy các meeeting mà userId là người tạo hoặc người tham gia và được confirmed
router.get("/search/confirmedmeeting/:userId", getConfirmedMeetingSchedules);
//-----------------------------------------

// ------------- GET LIST OF MEETINGS ------------


// ------------ update một meeting theo meetingId
router.patch("/update", updateMeetingSchedule);
// ------------------------------------------------------

// ------------ xóa một meeting theo meetingId
router.patch("/delete", deleteMeetingSchedule);
// ------------------------------------------------------

module.exports = router;