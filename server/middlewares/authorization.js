function ownershipAuthorize(req, res, next) {
  try {
    const userData = req.userData;
    const { id } = req.params;

    if (userData.role === "admin") {
      return next();
    }

    if (userData.id !== +id) {
      throw new Error("UNAUTHORIZED");
    }

    next();
  } catch (err) {
    next(err);
  }
}

function authorize(req, res, next) {
  try {
    const userData = req.userData;

    if (userData.role !== "admin") {
      throw new Error("UNAUTHORIZED");
    }

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = { ownershipAuthorize, authorize };
