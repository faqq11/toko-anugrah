const express = require("express");
const router = express.Router();

router.use("/users", require("./user.routes"));
router.use("/brands", require("./brand.routes"));

module.exports = router;
