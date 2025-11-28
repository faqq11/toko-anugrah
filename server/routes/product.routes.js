const express = require("express");
const ProductController = require("../controllers/product.controller");
const authentication = require("../middlewares/authentication");
const { authorize } = require("../middlewares/authorization");
const router = express.Router();

router.get("/", authentication, ProductController.getAllProduct);
router.post("/", authentication, authorize, ProductController.addProduct);
router.get("/:id", authentication, ProductController.getOneProduct);
// router.put("/:id", authentication, authorize, ProductController.updateProduct);
// router.delete("/:id", authentication, authorize, ProductController.deleteProduct);

module.exports = router;
