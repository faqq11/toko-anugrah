const { Order, Product } = require("../models/index");
const { Op } = require("sequelize");
class StatisticController {
  static async getOverview(req, res, next) {
    try {
      const today = new Date();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const [totalRevenue, totalOrders, totalProducts, lowStockCount] =
        await Promise.all([
          Order.sum("total_amount", {
            where: {
              createdAt: { [Op.gte]: startOfMonth },
            },
          }),

          Order.count({
            where: { createdAt: { [Op.gte]: startOfMonth } },
          }),

          Product.count(),

          Product.count({
            where: { stock: { [Op.lte]: 10, [Op.gt]: 0 } },
          }),
        ]);

      res.status(200).json({
        success: true,
        data: {
          totalRevenue: totalRevenue || 0,
          totalOrders,
          totalProducts,
          lowStockAlert: lowStockCount,
        },
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = StatisticController;
