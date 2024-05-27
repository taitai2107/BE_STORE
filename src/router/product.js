const express = require("express");
const router = express.Router();
const product = require("../controllers/productController");
router.get("/getAll", product.getAllProducts);
router.get("/getById", product.getDeltailProducts);
module.exports = router;
