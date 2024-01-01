const { 
    createResponse,
    getAllResponses,
    updateResponse,
    deleteResponse,
    getResponseByUserId
} = require("./response.controller");

const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/create", createResponse);

// router.get("/", getAllResponses);

// -------------- lấy response theo userId --------------
router.get("/search/user/:userId", getResponseByUserId);
// ------------------------------------------------------

router.patch("/update", updateResponse);
router.patch("/delete", deleteResponse);

module.exports = router;