const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const AuthController = require("../controllers/authController");
console.log(123);
router.get("/userinfo", verifyToken, AuthController.findUserByToken);
router.post("/login", AuthController.Login);
module.exports = router;
