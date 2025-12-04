const { ZodError } = require("zod");

function errorHandler(err, req, res, next) {
  console.error(err);

  let response = {
    success: false,
    status_code: 500,
    message: "Internal server error",
  };

  if (err.name === "SequelizeUniqueConstraintError") {
    response.status_code = 400;
    response.message = "Validation error";

    const field = err.errors[0].path;
    const value = err.errors[0].value;
    const tableName = err.errors[0].instance.constructor.name;

    response.errors = {
      [field]: [`${tableName} with ${field} '${value}' already exists`],
    };
  } else if (err instanceof ZodError) {
    response.status_code = 400;
    response.message = "Validation error";
    if (!response.hasOwnProperty("error")) {
      response.errors = {};
    }

    err.issues.forEach((issue) => {
      const field = issue.path.join(".") || "general";
      if (!response.errors.hasOwnProperty(field)) {
        response.errors[field] = [];
      }
      response.errors[field].push(issue.message);
    });
  } else if (err.message === "INVALID_CREDENTIAL") {
    response.status_code = 401;
    response.message = "Invalid email or password";
  } else if (
    err.message === "INVALID_TOKEN" ||
    err.name === "JsonWebTokenError"
  ) {
    response.status_code = 401;
    response.message = "Unauthorized / Invalid token";
  } else if (err.message === "DATA_NOT_FOUND") {
    response.status_code = 404;
    response.message = "Data not found";
  } else if (err.message === "UNAUTHORIZED") {
    response.status_code = 403;
    response.message = "Forbidden. You don't have access to this resource.";
  } else if (err.message === "INSUFFICIENT_STOCK") {
    response.status_code = 409;
    response.message = "Some items in your order are out of stock";
  } else if (err.message.startsWith("ORDER_ADDRESS_UPDATE:")) {
    response.status_code = 400;
    const orderStatus = err.message.split(": ")[1];
    response.message = `Cannot update address. Order is already ${orderStatus}.`;
  } else if (err.message.startsWith("ORDER_STATUS_UPDATE:")) {
    response.status_code = 400;
    const orderStatus = err.message.split(": ")[1];
    response.message = `Cannot update status. The status ${orderStatus} does not exist.`;
  }

  return res.status(response.status_code).json(response);
}

module.exports = errorHandler;
