function authorization(req, res, next) {
  try {
    const userData = req.userData;
    if (userData.role !== "admin") throw new Error("UNAUTHORIZED");

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = authorization;
