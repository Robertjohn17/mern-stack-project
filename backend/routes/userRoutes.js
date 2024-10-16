const express = require("express");
const router = express.Router();

const registerController = require("../controller/User/register");
const loginController = require("../controller/User/login");
const getLoggedInUser = require("../controller/User/loggedInUser");
const authToken = require("../middleware/authMiddleware");
const logoutController = require("../controller/User/logout");
const editProfile = require("../controller/User/editUser");
const getAllUsers = require("../controller/User/getAllUsers");
const deleteUser = require("../controller/User/deleteUser");
const banUser = require("../controller/User/banUser");
const unbanUser = require("../controller/User/unbanUser");

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/user", authToken, getLoggedInUser);
router.post("/logout", logoutController);
router.put("/editprofile", authToken, editProfile);
router.get("/all-users", getAllUsers);
router.delete("/:id", authToken, deleteUser);
router.put("/:id/ban", authToken, banUser);
router.put("/:id/unban", authToken, unbanUser);

module.exports = router;
