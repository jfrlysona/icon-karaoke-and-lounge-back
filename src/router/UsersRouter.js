const express = require("express");
const {
  deleteUser,
  getAllUsers,
  getUser,
  updateUserInfo,
} = require("../controller/UsersController.js");
const { verifyAccess } = require("../middleware/AuthMiddleware.js");

const UsersRouter = express.Router();

UsersRouter.put("/users/:countryCode-:phoneNumber", updateUserInfo);
UsersRouter.delete("/users/:countryCode-:phoneNumber", deleteUser);
UsersRouter.get("/users/:countryCode-:phoneNumber", getUser);
UsersRouter.get("/users", getAllUsers);

module.exports = { UsersRouter };

// UsersRouter.put("/users/:countryCode-:phoneNumber", verifyAccess(["Admin", "User"]), updateUserInfo);
// UsersRouter.delete("/users/:countryCode-:phoneNumber", verifyAccess(["Admin"]), deleteUser);
// UsersRouter.get("/users/:countryCode-:phoneNumber", verifyAccess(["Admin","User"]), getUser);
// UsersRouter.get("/users", verifyAccess(["Admin"]), getAllUsers);
