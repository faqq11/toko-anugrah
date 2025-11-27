const express = require("express");
const router = express.Router();

router.use("/users", require("./user.routes"));
router.use("/brands", require("./brand.routes"));
router.use("/categories", require("./category.routes"));

module.exports = router;
