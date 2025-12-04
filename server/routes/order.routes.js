const express = require("express");
const OrderController = require("../controllers/order.controller");
const authentication = require("../middlewares/authentication");
const {
  authorize,
  ownershipAuthorize,
} = require("../middlewares/authorization");
const router = express.Router();

router.get("/", authentication, authorize, OrderController.getAllOrder);
router.get("/", authentication, OrderController.getAllOrder);
// router.post("/:id", authentication, OrderController.getOneOrder);
router.post("/", authentication, OrderController.addOrder);
// router.post("/", authentication, OrderController.updateOrder);
// router.post("/", authentication, OrderController.deleteOrder);

module.exports = router;
