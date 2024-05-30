import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUserInfo,
} from "../controller/UsersController.js";

export const UsersRouter = express.Router();

UsersRouter.put("/users/:countryCode-:phoneNumber", updateUserInfo);
UsersRouter.delete("/users/:countryCode-:phoneNumber", deleteUser);
UsersRouter.get("/users/:countryCode-:phoneNumber", getUser);
UsersRouter.get("/users", getAllUsers);
