const { verifyToken } = require("../utils/jwt");
const { User } = require("../models/index");

async function authentication(req, res, next) {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer"))
      throw new Error("INVALID_TOKEN");

    const token = authorization.split(" ")[1];
    if (!token) throw new Error("INVALID_TOKEN");

    const payload = verifyToken(token);

    const user = await User.findOne({ where: { email: payload.email } });
    if (!user) throw new Error("INVALID_TOKEN");

    req.userData = {
      ...payload,
    };

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = authentication;
