const { ZodError } = require("zod");

function errorHandler(err, req, res, next) {
  // console.error(err);

  let response = {
    success: false,
    status_code: 500,
    message: "Internal server error",
  };

  if (err.name === "SequelizeUniqueConstraintError") {
    response.status_code = 400;
    response.message = "Validation error";
    response.errors = {
      email: ["Email already used"],
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
  }

  return res.status(response.status_code).json(response);
}

module.exports = errorHandler;
