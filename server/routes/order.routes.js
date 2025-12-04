const express = require("express");
const OrderController = require("../controllers/order.controller");
const authentication = require("../middlewares/authentication");
const router = express.Router();

// router.post("/", authentication, OrderController.getAllOrder);
// router.post("/", authentication, OrderController.getOneOrder);
router.post("/", authentication, OrderController.addOrder);
// router.post("/", authentication, OrderController.updateOrder);
// router.post("/", authentication, OrderController.deleteOrder);

module.exports = router;
