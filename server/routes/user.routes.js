const express = require("express");
const UserController = require("../controllers/user.controller");
const authentication = require("../middlewares/authentication");
const {
  ownershipAuthorize,
  authorize,
} = require("../middlewares/authorization");
const router = express.Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/", authentication, authorize, UserController.getAllUser);
router.get("/me", authentication, UserController.getMe);
router.get("/:id", authentication, UserController.getOneUser);
router.put(
  "/:id",
  authentication,
  ownershipAuthorize,
  UserController.updateUser
);
router.delete(
  "/:id",
  authentication,
  ownershipAuthorize,
  UserController.deleteuser
);

module.exports = router;
