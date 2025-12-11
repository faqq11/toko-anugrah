const { Order, OrderItem, Product, User } = require("../models/index");
const InvoiceService = require("../services/invoice.service");

class InvoiceController {
  static async generateInvoice(req, res, next) {
    try {
      const { id } = req.params;

      const order = await Order.findByPk(+id, {
        include: [
          {
            model: OrderItem,
            include: [
              {
                model: Product,
                attributes: ["name", "price"],
              },
            ],
          },
          {
            model: User,
            attributes: ["first_name", "last_name", "email"],
          },
        ],
      });

      if (!order) throw new Error("DATA_NOT_FOUND");

      const { fileName, filePath } = await InvoiceService.generateInvoice(
        order
      );

      res.download(filePath, fileName, (err) => {
        if (err) {
          next(err);
        }
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = InvoiceController;
