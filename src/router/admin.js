const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/adminController");
router.post("/create", AdminController.addUser);
router.delete("/delete", AdminController.delUser);
router.put("/update", AdminController.updateUser);
module.exports = router;
