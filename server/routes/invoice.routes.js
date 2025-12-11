const express = require("express");
const authentication = require("../middlewares/authentication");
const { ownershipAuthorize } = require("../middlewares/authorization");
const InvoiceController = require("../controllers/invoice.controller");
const router = express.Router();

router.get(
  "/:id/download",
  authentication,
  ownershipAuthorize,
  InvoiceController.generateInvoice
);
// router.get(
//   "/:id/view",
//   authentication,
//   ownershipAuthorize,
//   InvoiceController.viewInvoice
// );

module.exports = router;
