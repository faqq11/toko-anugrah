const express = require("express");
const StatisticController = require("../controllers/statistic.controller");
const authentication = require("../middlewares/authentication");
const { authorize } = require("../middlewares/authorization");
const router = express.Router();

router.use(
  "/overview",
  authentication,
  authorize,
  StatisticController.getOverview
);

module.exports = router;
