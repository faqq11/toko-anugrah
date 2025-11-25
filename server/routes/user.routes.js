const express = require("express");
const UserController = require("../controllers/user.controller");
const router = express.Router();

router.post("/register", UserController.register);
// router.post("/login", UserController.login);
// router.get("/", UserController.getAllUser);
// router.get("/:id", UserController.getOneUser);
// router.put("/:id", UserController.updateUser);
// router.delete("/:id", UserController.deleteuser);

module.exports = router;
