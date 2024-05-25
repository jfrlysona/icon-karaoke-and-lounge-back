import express from "express";
import {
  createCategories,
  deleteCategory,
  getAllCategories,
  getCategoriesWithItems,
  getCategoryById,
  updateCategory,
} from "../controller/CategoriesController.js";

export const CategoriesRouter = express.Router();

CategoriesRouter.get("/categories", getAllCategories);
CategoriesRouter.get("/categories/:id", getCategoryById);
CategoriesRouter.get("/categories-with-items", getCategoriesWithItems);
CategoriesRouter.post("/categories", createCategories);
CategoriesRouter.put("/categories/:id", updateCategory);
CategoriesRouter.delete("/categories/:id", deleteCategory);
