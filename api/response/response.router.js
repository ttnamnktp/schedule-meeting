const { 
    createResponse,
    getAllResponses,
    updateResponse,
    deleteResponse,
    getResponseByMeetingId
} = require("./response.controller");

const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

//--------------- tạo một response
// -------------- body truyền vào 3 tham số userId, meetingId, choice dưới dạng json
router.post("/create", createResponse);
//--------------------------------------------------

// router.get("/", getAllResponses);

// -------------- lấy response theo meetingId --------------
//--------------- truyền tham số meetingId qua params trên đường dẫn 
router.get("/search/meeting/:meetingId", getResponseByMeetingId);
// ------------------------------------------------------

//-------------- update lại trường choice trong response,
//-------------- body truyền vào một trường choice mới và responseId
router.patch("/update", updateResponse);
//------------------------------------------------------

//-------------- xóa mềm response theo responseId
//-------------- body truyền vào một trường responseId
router.patch("/delete", deleteResponse);
//-----------------------------------------------------

module.exports = router;