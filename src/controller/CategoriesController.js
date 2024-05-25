import { CategoriesModel } from "../model/CategoriesModel.js";

export const getAllCategories = async (req, res) => {
  try {
    const AllCategories = await CategoriesModel.find({});
    res.status(200).json(AllCategories);
  } catch (error) {
    res.send("Categories are not found!");
  }
};

export const getCategoryById = async (req, res) => {
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

export const createCategories = async (req, res, next) => {
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

export const updateCategory = async (req, res) => {
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

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await CategoriesModel.findByIdAndDelete(id);
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category" });
  }
};
export const getCategoriesWithItems = async (req, res) => {
  try {
    const categoriesWithItems = await CategoriesModel.aggregate([
      {
        $lookup: {
          from: "items", 
          localField: "items",
          foreignField: "_id",
          as: "items"
        }
      },
      {
        $project: {
          name: 1,
          items: {
            name: 1,
            price: 1,
            image: 1,
            ingredients: 1,
            _id: 1
          }
        }
      }
    ]);

    res.status(200).json(categoriesWithItems);
  } catch (error) {
    console.error("Error fetching categories with items:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};