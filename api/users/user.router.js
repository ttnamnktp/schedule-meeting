const { 
    createUser,
    getUserByUserId,
    getUsers,
    updateUser,
    deleteUser,
    login,
    getUserByUsername 
} = require("./user.controller");

const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

// router.post("/", checkToken, createUser);
router.post("/", createUser);
router.get("/", checkToken, getUsers);
router.get("/:userId", checkToken, getUserByUserId);
router.patch("/update", checkToken, updateUser);
router.patch("/delete", checkToken, deleteUser);
router.get("/setting/:username", checkToken, getUserByUsername);
router.post("/login", login);

module.exports = router;