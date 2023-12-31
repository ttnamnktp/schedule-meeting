const { 
    createResponse,
    getAllResponses,
    updateResponse,
    deleteResponse
} = require("./response.controller");

const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/create", createResponse);
router.get("/", getAllResponses);
router.patch("/update", updateResponse);
router.patch("/delete", deleteResponse);

module.exports = router;