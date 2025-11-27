const express = require("express");
const BrandController = require("../controllers/brand.controller");
const authentication = require("../middlewares/authentication");
const { authorize } = require("../middlewares/authorization");
const router = express.Router();

// router.get("/", BrandController.getAllBrand);
router.post("/", authentication, authorize, BrandController.addBrand);
// router.delete("/:id", BrandController.deleteBrand);

module.exports = router;
