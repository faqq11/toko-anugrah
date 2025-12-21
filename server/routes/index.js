const express = require("express");
const router = express.Router();

router.use("/users", require("./user.routes"));
router.use("/brands", require("./brand.routes"));
router.use("/categories", require("./category.routes"));
router.use("/products", require("./product.routes"));
router.use("/orders", require("./order.routes"));
router.use("/statistics", require("./statistic.routes"));
router.use("/invoice", require("./invoice.routes"));
router.use("/cart", require("./cart.routes"));

module.exports = router;
