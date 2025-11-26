const express = require("express");
const UserController = require("../controllers/user.controller");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const router = express.Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);

router.get("/", authentication, authorization, UserController.getAllUser);
router.get("/:id", authentication, UserController.getOneUser);
router.put("/:id", authentication, authorization, UserController.updateUser);
router.delete("/:id", authentication, authorization, UserController.deleteuser);

module.exports = router;
