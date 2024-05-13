const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
  res.json("not ok");
});
module.exports = router;
