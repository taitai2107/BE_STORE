const express = require("express");
const router = express.Router();
const userController = require("../controllers/userManageController");
router.post("/create", userController.addUser);
module.exports = router;
