const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

class InvoiceService {
  static formatCurrency(amount) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  }

  static async generateInvoice(order) {
    const customer = order.User.last_name
      ? `${order.User.first_name} ${order.User.last_name}`
      : `${order.User.first_name}`;
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({
        size: [226.77, 841.89],
        margin: 10,
      });

      const fileName = `invoice-${order.id}-${Date.now()}.pdf`;
      const filePath = path.join("public", "invoices", fileName);

      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      const centerText = (text, y, size = 10) => {
        doc.fontSize(size).text(text, 0, y, {
          align: "center",
          width: doc.page.width,
        });
      };

      let y = 15;

      doc.font("Helvetica-Bold");
      centerText("Toko Anugrah", y, 14);
      y += 18;

      doc.font("Helvetica");
      centerText(
        "Jl. Arjawinangun Jagapura, Gegesik Kidul, Kec. Gegesik",
        y,
        8
      );
      y += 12;
      centerText("Kab. Cirebon", y, 8);
      y += 12;
      centerText("Telp: 0812-2331-967", y, 8);
      y += 20;

      doc
        .strokeColor("#000000")
        .lineWidth(1)
        .moveTo(10, y)
        .lineTo(doc.page.width - 10, y)
        .stroke();
      y += 15;

      doc.fontSize(8).font("Helvetica");

      const labelX = 10;
      const valueX = 70;

      doc.text("Invoice", labelX, y);
      doc.text(`: INV-${order.id}`, valueX, y);
      y += 12;

      doc.text("Date", labelX, y);
      doc.text(
        `: ${new Date(order.createdAt).toLocaleDateString("id-ID")}`,
        valueX,
        y
      );
      y += 12;

      doc.text("Time", labelX, y);
      doc.text(
        `: ${new Date(order.createdAt).toLocaleTimeString("id-ID")}`,
        valueX,
        y
      );
      y += 12;

      doc.text("Cashier", labelX, y);
      doc.text(`: Admin`, valueX, y);
      y += 12;

      doc.text("Customer", labelX, y);
      doc.text(`: ${customer}`, valueX, y);
      y += 15;

      doc
        .strokeColor("#000000")
        .lineWidth(0.5)
        .moveTo(10, y)
        .lineTo(doc.page.width - 10, y)
        .stroke();
      y += 12;

      doc.fontSize(8).font("Helvetica-Bold");
      const itemX = 10;
      const qtyX = 130;
      const priceX = 160;
      const priceWidth = 46;

      doc.text("ITEM", itemX, y);
      doc.text("QTY", qtyX, y);
      doc.text("PRICE", priceX, y, { align: "right", width: priceWidth });
      y += 12;

      doc
        .strokeColor("#000000")
        .lineWidth(0.5)
        .moveTo(10, y)
        .lineTo(doc.page.width - 10, y)
        .stroke();
      y += 10;

      doc.font("Helvetica").fontSize(8);

      order.OrderItems.forEach((item) => {
        const itemNameWidth = 110;
        doc.text(item.Product.name, itemX, y, { width: itemNameWidth });
        const nameHeight = doc.heightOfString(item.Product.name, {
          width: itemNameWidth,
        });

        doc.text(item.quantity, qtyX, y);
        doc.text(this.formatCurrency(item.price), priceX, y, {
          align: "right",
          width: priceWidth,
        });

        y += Math.max(nameHeight, 10) + 2;

        const subtotal = this.formatCurrency(item.quantity * item.price);
        doc.text(
          `${item.quantity} x ${this.formatCurrency(item.price)} = ${subtotal}`,
          itemX,
          y,
          { width: doc.page.width - 20, align: "right" }
        );
        y += 14;
      });

      doc
        .strokeColor("#000000")
        .lineWidth(0.5)
        .moveTo(10, y)
        .lineTo(doc.page.width - 10, y)
        .stroke();
      y += 12;

      doc.fontSize(10).font("Helvetica-Bold");
      doc.text("TOTAL:", itemX, y);
      doc.text(this.formatCurrency(order.total_amount), priceX, y, {
        align: "right",
        width: 60,
      });
      y += 20;

      doc
        .strokeColor("#000000")
        .lineWidth(1)
        .moveTo(10, y)
        .lineTo(doc.page.width - 10, y)
        .stroke();
      y += 15;

      doc.font("Helvetica-Bold");
      centerText("Thank You", y, 9);
      y += 15;

      doc.font("Helvetica");
      centerText("Please come again", y, 7);
      y += 12;
      centerText("Toko Anugrah", y, 7);
      y += 20;

      centerText("*INV-" + order.id + "*", y, 10);
      y += 20;

      doc
        .strokeColor("#000000")
        .lineWidth(0.5)
        .moveTo(10, y)
        .lineTo(doc.page.width - 10, y)
        .stroke();

      doc.end();

      stream.on("finish", () => resolve({ fileName, filePath }));
      stream.on("error", reject);
    });
  }
}

module.exports = InvoiceService;
