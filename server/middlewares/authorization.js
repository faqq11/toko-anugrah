function authorization(req, res, next) {
  try {
    const userData = req.userData;
    const { id } = req.params;

    console.log(userData, id);
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

module.exports = authorization;
