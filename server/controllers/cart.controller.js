const { Cart, CartItem, Product } = require("../models/index");

class CartController {
  static async getCart(req, res, next) {
    try {
      const userData = req.userData;

      let cart = await Cart.findOne({
        where: { UserId: userData.id },
        include: [
          {
            model: CartItem,
            include: [{ model: Product }],
          },
        ],
      });

      if (!cart) {
        cart = await Cart.create({
          UserId: userData.id,
          total_amount: 0,
        });
        cart.CartItems = [];
      }

      res.status(200).json({
        success: true,
        status_code: 200,
        message: "Cart retrieved successfully",
        data: {
          id: cart.id,
          user_id: cart.UserId,
          total_amount: cart.total_amount,
          items: cart.CartItems.map((item) => ({
            id: item.id,
            product_id: item.ProductId,
            product_name: item.Product.name,
            product_price: item.Product.price,
            quantity: item.quantity,
            price: item.price,
            subtotal: item.quantity * item.price,
          })),
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async addToCart(req, res, next) {
    try {
      const userData = req.userData;
      const { product_id, quantity } = req.body;

      if (!product_id) throw new Error("PRODUCT_ID_REQUIRED");
      if (!quantity || quantity < 1) throw new Error("INVALID_QUANTITY");

      const product = await Product.findByPk(product_id);
      if (!product) throw new Error("PRODUCT_NOT_FOUND");
      if (product.stock < quantity) throw new Error("INSUFFICIENT_STOCK");

      let cart = await Cart.findOne({
        where: { UserId: userData.id },
      });

      if (!cart) {
        cart = await Cart.create({
          UserId: userData.id,
          total_amount: 0,
        });
      }

      let cartItem = await CartItem.findOne({
        where: {
          CartId: cart.id,
          ProductId: product_id,
        },
      });

      if (cartItem) {
        const newQuantity = cartItem.quantity + quantity;
        if (product.stock < newQuantity) throw new Error("INSUFFICIENT_STOCK");

        cartItem.quantity = newQuantity;
        await cartItem.save();
      } else {
        cartItem = await CartItem.create({
          CartId: cart.id,
          ProductId: product_id,
          quantity: quantity,
          price: product.price,
        });
      }

      await cart.updateTotal();

      cart = await Cart.findByPk(cart.id, {
        include: [
          {
            model: CartItem,
            include: [{ model: Product }],
          },
        ],
      });

      res.status(201).json({
        success: true,
        status_code: 201,
        message: "Item added to cart successfully",
        data: {
          id: cart.id,
          user_id: cart.UserId,
          total_amount: cart.total_amount,
          items: cart.CartItems.map((item) => ({
            id: item.id,
            product_id: item.ProductId,
            product_name: item.Product.name,
            product_price: item.Product.price,
            quantity: item.quantity,
            price: item.price,
            subtotal: item.quantity * item.price,
          })),
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async updateCartItem(req, res, next) {
    try {
      const userData = req.userData;
      const { id } = req.params;
      const { quantity } = req.body;

      if (!quantity || quantity < 1) throw new Error("INVALID_QUANTITY");

      const cartItem = await CartItem.findByPk(id, {
        include: [
          {
            model: Cart,
            where: { UserId: userData.id },
          },
          { model: Product },
        ],
      });

      if (!cartItem) throw new Error("CART_ITEM_NOT_FOUND");

      if (cartItem.Product.stock < quantity)
        throw new Error("INSUFFICIENT_STOCK");

      cartItem.quantity = quantity;
      await cartItem.save();

      const cart = await Cart.findByPk(cartItem.CartId);
      await cart.updateTotal();

      const updatedCart = await Cart.findByPk(cart.id, {
        include: [
          {
            model: CartItem,
            include: [{ model: Product }],
          },
        ],
      });

      res.status(200).json({
        success: true,
        status_code: 200,
        message: "Cart item updated successfully",
        data: {
          id: updatedCart.id,
          user_id: updatedCart.UserId,
          total_amount: updatedCart.total_amount,
          items: updatedCart.CartItems.map((item) => ({
            id: item.id,
            product_id: item.ProductId,
            product_name: item.Product.name,
            product_price: item.Product.price,
            quantity: item.quantity,
            price: item.price,
            subtotal: item.quantity * item.price,
          })),
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async removeFromCart(req, res, next) {
    try {
      const userData = req.userData;
      const { id } = req.params;

      const cartItem = await CartItem.findByPk(id, {
        include: [
          {
            model: Cart,
            where: { UserId: userData.id },
          },
        ],
      });

      if (!cartItem) throw new Error("CART_ITEM_NOT_FOUND");

      const cartId = cartItem.CartId;

      await cartItem.destroy();

      const cart = await Cart.findByPk(cartId);
      await cart.updateTotal();

      const updatedCart = await Cart.findByPk(cart.id, {
        include: [
          {
            model: CartItem,
            include: [{ model: Product }],
          },
        ],
      });

      res.status(200).json({
        success: true,
        status_code: 200,
        message: "Item removed from cart successfully",
        data: {
          id: updatedCart.id,
          user_id: updatedCart.UserId,
          total_amount: updatedCart.total_amount,
          items: updatedCart.CartItems.map((item) => ({
            id: item.id,
            product_id: item.ProductId,
            product_name: item.Product.name,
            product_price: item.Product.price,
            quantity: item.quantity,
            price: item.price,
            subtotal: item.quantity * item.price,
          })),
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async clearCart(req, res, next) {
    try {
      const userData = req.userData;

      const cart = await Cart.findOne({
        where: { UserId: userData.id },
      });

      if (!cart) throw new Error("CART_NOT_FOUND");

      await CartItem.destroy({
        where: { CartId: cart.id },
      });

      cart.total_amount = 0;
      await cart.save();

      res.status(200).json({
        success: true,
        status_code: 200,
        message: "Cart cleared successfully",
        data: {
          id: cart.id,
          user_id: cart.UserId,
          total_amount: cart.total_amount,
          items: [],
        },
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CartController;
