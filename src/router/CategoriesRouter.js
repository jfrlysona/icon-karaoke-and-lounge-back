import express from "express";
import {
  createCategories,
  deleteCategory,
  getAllCategories,
  getCategoriesWithItems,
  getCategoryById,
  updateCategory,
} from "../controller/CategoriesController.js";
import { verifyAccess } from "../middleware/AuthMiddleware.js";

export const CategoriesRouter = express.Router();

CategoriesRouter.get("/categories", getAllCategories);
CategoriesRouter.get("/categories-with-items", getCategoriesWithItems);
CategoriesRouter.get("/categories/:id", getCategoryById);
CategoriesRouter.post("/categories", createCategories);
CategoriesRouter.put("/categories/:id", updateCategory);
CategoriesRouter.delete("/categories/:id", deleteCategory);

// CategoriesRouter.get("/categories", getAllCategories);
// CategoriesRouter.get("/categories-with-items", getCategoriesWithItems);
// CategoriesRouter.get("/categories/:id", verifyAccess(["Admin"]), getCategoryById);
// CategoriesRouter.post("/categories", verifyAccess(["Admin"]), createCategories);
// CategoriesRouter.put("/categories/:id", verifyAccess(["Admin"]), updateCategory);
// CategoriesRouter.delete("/categories/:id", verifyAccess(["Admin"]), deleteCategory);
