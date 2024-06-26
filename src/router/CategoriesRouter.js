const express = require("express");
const {
  getAllCategories,
  getCategoryById,
  createCategories,
  updateCategory,
  deleteCategory,
  getCategoriesWithItems,
} = require("../controller/CategoriesController.js");

const CategoriesRouter = express.Router();

CategoriesRouter.get("/categories", getAllCategories);
CategoriesRouter.get("/categories-with-items", getCategoriesWithItems);
CategoriesRouter.get("/categories/:id", getCategoryById);
CategoriesRouter.post("/categories", createCategories);
CategoriesRouter.put("/categories/:id", updateCategory);
CategoriesRouter.delete("/categories/:id", deleteCategory);

module.exports = { CategoriesRouter };

// CategoriesRouter.get("/categories", getAllCategories);
// CategoriesRouter.get("/categories-with-items", getCategoriesWithItems);
// CategoriesRouter.get("/categories/:id", verifyAccess(["Admin"]), getCategoryById);
// CategoriesRouter.post("/categories", verifyAccess(["Admin"]), createCategories);
// CategoriesRouter.put("/categories/:id", verifyAccess(["Admin"]), updateCategory);
// CategoriesRouter.delete("/categories/:id", verifyAccess(["Admin"]), deleteCategory);
