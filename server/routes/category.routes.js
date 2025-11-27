const express = require("express");
const CategoryController = require("../controllers/category.controller");
const authentication = require("../middlewares/authentication");
const { authorize } = require("../middlewares/authorization");
const router = express.Router();

router.get("/", authentication, CategoryController.getAllCategory);
router.post("/", authentication, authorize, CategoryController.addCategory);
router.delete(
  "/:id",
  authentication,
  authorize,
  CategoryController.deleteCategory
);

module.exports = router;
