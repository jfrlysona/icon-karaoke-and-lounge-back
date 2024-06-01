import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUserInfo,
} from "../controller/UsersController.js";
import { verifyAccess } from "../middleware/AuthMiddleware.js";

export const UsersRouter = express.Router();

UsersRouter.put("/users/:countryCode-:phoneNumber", updateUserInfo);
UsersRouter.delete("/users/:countryCode-:phoneNumber", deleteUser);
UsersRouter.get("/users/:countryCode-:phoneNumber", getUser);
UsersRouter.get("/users", getAllUsers);

// UsersRouter.put("/users/:countryCode-:phoneNumber", verifyAccess(["Admin", "User"]), updateUserInfo);
// UsersRouter.delete("/users/:countryCode-:phoneNumber", verifyAccess(["Admin"]), deleteUser);
// UsersRouter.get("/users/:countryCode-:phoneNumber", verifyAccess(["Admin","User"]), getUser);
// UsersRouter.get("/users", verifyAccess(["Admin"]), getAllUsers);
