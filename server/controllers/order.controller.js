const trimFields = require("../utils/trim-fields");
const { orderInputSchema } = require("../validators/order.validator");
const { Order, sequelize, Product, OrderItem } = require("../models/index");

class OrderController {
  static async getAllOrder(req, res, next) {
    try {
      const orders = await Order.findAll({
        include: [
          {
            model: OrderItem,
            include: [{ model: Product }],
          },
        ],
      });

      if (orders.length < 1) throw new Error("DATA_NOT_FOUND");

      res.status(200).json({
        success: true,
        status_code: 200,
        message: "Order list retrieved successfully",
        data: orders.map((order) => ({
          id: order.id,
          user_id: order.UserId,
          total_amount: order.total_amount,
          status: order.status,
          shipping_address: order.shipping_address,
          order_items: order.OrderItems.map((item) => ({
            id: item.id,
            order_id: order.id,
            product_name: item.Product.name,
            quantity: item.quantity,
            price: item.price,
          })),
        })),
      });
    } catch (err) {
      next(err);
    }
  }

  static async getAllOrderOwnership(req, res, next) {
    try {
      const userData = req.userData;

      const orders = await Order.findAll({
        where: { UserId: userData.id },
        include: [
          {
            model: OrderItem,
            include: [{ model: Product }],
          },
        ],
      });

      if (orders.length < 1) throw new Error("DATA_NOT_FOUND");

      res.status(200).json({
        success: true,
        status_code: 200,
        message: "Order list retrieved successfully",
        data: orders.map((order) => ({
          id: order.id,
          user_id: order.UserId,
          total_amount: order.total_amount,
          status: order.status,
          shipping_address: order.shipping_address,
          order_items: order.OrderItems.map((item) => ({
            id: item.id,
            order_id: order.id,
            product_name: item.Product.name,
            quantity: item.quantity,
            price: item.price,
          })),
        })),
      });
    } catch (err) {
      next(err);
    }
  }

  static async getOneOrder(req, res, next) {
    try {
      const { id } = req.params;

      const order = await Order.findByPk(+id, {
        include: [
          {
            model: OrderItem,
            include: [{ model: Product }],
          },
        ],
      });
      if (!order) throw new Error("DATA_NOT_FOUND");

      res.status(200).json({
        success: true,
        status_code: 200,
        message: "Order retrieved successfully",
        data: {
          id: order.id,
          user_id: order.UserId,
          total_amount: order.total_amount,
          status: order.status,
          shipping_address: order.shipping_address,
          order_items: order.OrderItems.map((item) => ({
            id: item.id,
            order_id: order.id,
            product_name: item.Product.name,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async addOrder(req, res, next) {
    try {
      let input = req.body;
      const userData = req.userData;

      input = trimFields(input, ["shipping_address"]);

      const parsedInput = orderInputSchema.parse(input);

      const result = await sequelize.transaction(async (t) => {
        const productIds = parsedInput.items.map((item) => item.id);
        const products = await Product.findAll({
          where: { id: productIds },
          transaction: t,
          lock: t.LOCK.UPDATE,
        });

        console.log(products);

        if (products.length !== productIds.length) {
          throw new Error("DATA_NOT_FOUND");
        }

        let total_amount = 0;
        const orderItems = [];

        for (const item of parsedInput.items) {
          const product = products.find((p) => p.id === item.id);

          if (!product) {
            throw new Error(`DATA_NOT_FOUND`);
          }

          if (product.stock < item.quantity) {
            throw new Error(`INSUFFICIENT_STOCK`);
          }

          const subtotal = product.price * item.quantity;
          total_amount += subtotal;

          orderItems.push({
            ProductId: item.id,
            quantity: item.quantity,
            price: product.price,
          });
        }

        const order = await Order.create(
          {
            UserId: userData.id,
            shipping_address: parsedInput.shipping_address,
            total_amount,
            status: "pending",
          },
          { transaction: t }
        );

        const orderItemsWithOrderId = orderItems.map((item) => ({
          ...item,
          OrderId: order.id,
        }));

        await OrderItem.bulkCreate(orderItemsWithOrderId, { transaction: t });

        for (const item of parsedInput.items) {
          await Product.decrement("stock", {
            by: item.quantity,
            where: { id: item.id },
            transaction: t,
          });
        }

        return order;
      });

      res.status(201).json({
        success: true,
        status_code: 201,
        message: "Order created successfully",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  // static async updateOrder(req, res, next) {
  //   try {
  //   } catch (err) {
  //     next(err);
  //   }
  // }

  // static async deleteOrder(req, res, next) {
  //   try {
  //   } catch (err) {
  //     next(err);
  //   }
  // }
}

module.exports = OrderController;
