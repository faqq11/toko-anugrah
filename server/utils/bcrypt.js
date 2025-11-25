const bcrypt = require("bcryptjs");

function hashPassword(plainPassword) {
  return bcrypt.hashSync(plainPassword);
}

function checkPassword(plainPassword, hashedPassword) {
  return bcrypt.compareSync(plainPassword, hashedPassword);
}

module.exports = { hashPassword, checkPassword };
