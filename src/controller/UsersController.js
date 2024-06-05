const UsersModel = require("../model/UserModel.js");

const updateUserInfo = async (req, res) => {
  const { fullname, gender, role } = req.body;
  const { phoneNumber, countryCode } = req.params;
  try {
    const user = await UsersModel.findOne({ phoneNumber, countryCode });

    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    user.fullname = fullname || user.fullname;
    user.gender = gender || user.gender;

    if (role && user.role === "Admin") {
      user.role = role;
    }

    await user.save();

    res.status(200).json({
      message: "User information updated successfully!",
      data: user,
    });
  } catch (error) {
    console.error("Error updating user information:", error);
    res.status(400).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
};
const deleteUser = async (req, res) => {
  const { phoneNumber, countryCode } = req.params;

  try {
    const user = await UsersModel.findOneAndDelete({
      phoneNumber,
      countryCode,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    res.status(200).json({
      message: "User deleted successfully!",
      data: user,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(400).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
};

const getUser = async (req, res) => {
  const { phoneNumber, countryCode } = req.params;

  try {
    const userWithOrders = await UsersModel.findOne({
      phoneNumber,
      countryCode,
    }).populate({
      path: "orders",
      select: "amount note status",
      populate: {
        path: "items.itemId",
        select: "name price",
      },
    });

    if (!userWithOrders) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    res.status(200).json(userWithOrders);
  } catch (error) {
    console.error("Error retrieving user with orders:", error);
    res.status(400).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const usersWithOrders = await UsersModel.find({}).populate({
      path: "orders",
      select: "amount note status",
      populate: {
        path: "items.itemId",
        select: "name price",
      },
    });

    res.status(200).json(usersWithOrders);
  } catch (error) {
    console.error("Error retrieving all users with orders:", error);
    res.status(400).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
};

module.exports = {
  deleteUser,
  getAllUsers,
  getUser,
  updateUserInfo,
};
