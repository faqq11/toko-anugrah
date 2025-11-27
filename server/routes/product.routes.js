const express = require("express");
const ProductController = require("../controllers/product.controller");
const router = express.Router();

// router.get("/", ProductController.getAllProduct);
// router.get("/", ProductController.getOneProduct);
router.post("/", ProductController.addProduct);
// router.put("/", ProductController.updateProduct);
// router.delete("/", ProductController.deleteProduct);

module.exports = router;
