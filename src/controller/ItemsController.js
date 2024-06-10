const ItemsModel = require("../model/ItemsModel.js");
const CategoriesModel = require("../model/CategoriesModel.js");

const getAllItems = async (req, res) => {
  try {
    const AllItems = await ItemsModel.find({});
    res.status(200).json(AllItems);
  } catch (error) {
    res.status(500).json({ message: "Categories are not found!" });
  }
};

const getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await ItemsModel.findById(id);
    if (!item) {
      return res.status(404).json("Item is not found!");
    }
    res.status(200).send(item);
  } catch (error) {
    console.error("Error retrieving item by ID:", error);
    res.status(500).json("Internal Server Error");
  }
};

const createItem = async (req, res) => {
  try {
    const { name, price, categoryId, ingredients } = req.body;
    const image = req.file.path;
    const newItemData = {
      name,
      price,
      categoryId,
      ingredients,
    };
    if (image) {
      newItemData.image = image;
    }

    const newItem = new ItemsModel(newItemData);

    await newItem.save();

    const category = await CategoriesModel.findByIdAndUpdate(
      categoryId,
      { $push: { items: newItem._id } },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json({ newItem, category });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Item is not created due to an internal server error" });
  }
};

const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, categoryId, ingredients } = req.body;
    const image = req.file ? req.file.path : undefined;
    const existingItem = await ItemsModel.findById(id);
    if (!existingItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    const updatedItemData = {
      name,
      price,
      categoryId,
      ingredients,
    };

    if (image) {
      updatedItemData.image = image;
    }

    const updatedItem = await ItemsModel.findByIdAndUpdate(
      id,
      updatedItemData,
      { new: true }
    );

    if (existingItem.categoryId.toString() !== categoryId) {
      await CategoriesModel.findByIdAndUpdate(existingItem.categoryId, {
        $pull: { items: existingItem._id },
      });
      await CategoriesModel.findByIdAndUpdate(categoryId, {
        $push: { items: updatedItem._id },
      });
    }

    res.json(updatedItem);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Item is not updated due to an internal server error" });
  }
};

const deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await ItemsModel.findByIdAndDelete(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    await CategoriesModel.updateOne({ items: id }, { $pull: { items: id } });
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting item" });
  }
};

const getItemsWithCategory = async (req, res) => {
  try {
    const itemsWithCategory = await ItemsModel.find().populate({
      path: "categoryId",
      select: "name",
    });

    res.status(200).json(itemsWithCategory);
  } catch (error) {
    console.error("Error fetching items with category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createItem,
  deleteItem,
  getAllItems,
  getItemById,
  getItemsWithCategory,
  updateItem,
};
