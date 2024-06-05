const CategoriesModel = require("../model/CategoriesModel.js");

const getAllCategories = async (req, res) => {
  try {
    const AllCategories = await CategoriesModel.find({});
    res.status(200).json(AllCategories);
  } catch (error) {
    res.send("Categories are not found!");
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await CategoriesModel.findById(id);
    if (!category) {
      return res.status(404).json("Category not found!");
    }
    res.status(200).send(category);
  } catch (error) {
    console.error("Error retrieving category by ID:", error);
    res.status(500).json("Internal Server Error");
  }
};

const createCategories = async (req, res, next) => {
  try {
    const { name, items } = req.body;
    const newCategories = CategoriesModel({
      name,
      items,
    });

    await newCategories.save();
    res.json(newCategories);
  } catch (error) {
    res.status(500).json("Category is not created!");
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, items } = req.body;
    const category = await CategoriesModel.findByIdAndUpdate(id, {
      name,
      items,
    });
    res.send(category);
  } catch (error) {
    res.status(500).json("Category is not updated!");
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await CategoriesModel.findByIdAndDelete(id);
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category" });
  }
};

const getCategoriesWithItems = async (req, res) => {
  try {
    const categoriesWithItems = await CategoriesModel.find().populate({
      path: "items",
      select: "name price image ingredients",
    });
    res.status(200).json(categoriesWithItems);
  } catch (error) {
    console.error("Error fetching categories with items:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {
  getAllCategories,
  getCategoryById,
  createCategories,
  updateCategory,
  deleteCategory,
  getCategoriesWithItems,
};
