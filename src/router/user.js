const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
router.put("/change_pass", UserController.changePassword);
router.post("/register", UserController.register);
module.exports = router;
