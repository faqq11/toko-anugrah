const express = require("express");
const OrderController = require("../controllers/order.controller");
const authentication = require("../middlewares/authentication");
const {
  authorize,
  ownershipAuthorize,
} = require("../middlewares/authorization");
const router = express.Router();

router.get("/", authentication, authorize, OrderController.getAllOrder);
router.get("/own", authentication, OrderController.getAllOrderOwnership);
router.post("/", authentication, OrderController.addOrder);
router.get(
  "/:id",
  authentication,
  ownershipAuthorize,
  OrderController.getOneOrder
);
// router.post("/", authentication, OrderController.updateOrder);
router.delete(
  "/:id",
  authentication,
  ownershipAuthorize,
  OrderController.deleteOrder
);

module.exports = router;
