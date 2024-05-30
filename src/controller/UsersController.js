import { UsersModel } from "../model/UserModel.js";

export const updateUserInfo = async (req, res) => {
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

    if (role && user.role === "admin") {
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
export const deleteUser = async (req, res) => {
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

export const getUser = async (req, res) => {
  const { phoneNumber, countryCode } = req.params;

  try {
    const userWithOrders = await UsersModel.aggregate([
      { $match: { phoneNumber, countryCode } },
      {
        $lookup: {
          from: "orders",
          localField: "orders",
          foreignField: "_id",
          as: "orders",
        },
      },
      {
        $project: {
          phoneNumber: 1,
          countryCode: 1,
          fullname: 1,
          gender: 1,
          role: 1,
          orders: {
            _id: 1,
            amount: 1,
            status: 1,
            cashback: 1,
            count: 1,
            note: 1,
            itemsName: 1,
            itemsPrice: 1,
          },
        },
      },
    ]);

    if (userWithOrders.length === 0) {
      return res.status(404).json({
        message: "User not found!",
      });
    }
    res.status(200).json(userWithOrders[0]);
  } catch (error) {
    console.error("Error retrieving user with orders:", error);
    res.status(400).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const usersWithOrders = await UsersModel.aggregate([
      {
        $lookup: {
          from: "orders",
          localField: "orders",
          foreignField: "_id",
          as: "orders",
        },
      },
      {
        $project: {
          phoneNumber: 1,
          countryCode: 1,
          fullname: 1,
          gender: 1,
          role: 1,
          orders: {
            _id: 1,
            amount: 1,
            status: 1,
            cashback: 1,
            count: 1,
            note: 1,
            itemsName: 1,
            itemsPrice: 1,
          },
        },
      },
    ]);

    res.status(200).json(usersWithOrders);
  } catch (error) {
    console.error("Error retrieving all users with orders:", error);
    res.status(400).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
};
