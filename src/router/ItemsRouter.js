import express from "express";
import {
  createItem,
  deleteItem,
  getAllItems,
  getItemById,
  getItemsWithCategory,
  updateItem,
} from "../controller/ItemsController.js";
import { upload } from "../middleware/UploadMiddleware.js";

export const ItemsRouter = express.Router();

ItemsRouter.get("/items", getAllItems);
ItemsRouter.get("/items/:id", getItemById);
ItemsRouter.get("/items-with-category", getItemsWithCategory);
ItemsRouter.post("/items", upload.single("image"), createItem);
ItemsRouter.put("/items/:id", upload.single("image"), updateItem);
ItemsRouter.delete("/items/:id", deleteItem);
