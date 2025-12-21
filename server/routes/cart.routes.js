const express = require("express");
const CartController = require("../controllers/cart.controller");
const authentication = require("../middlewares/authentication");
const router = express.Router();

router.get("/", authentication, CartController.getCart);
router.post("/items", authentication, CartController.addToCart);
router.put("/items/:id", authentication, CartController.updateCartItem);
router.delete("/items/:id", authentication, CartController.removeFromCart);
router.delete("/clear", authentication, CartController.clearCart);

module.exports = router;
