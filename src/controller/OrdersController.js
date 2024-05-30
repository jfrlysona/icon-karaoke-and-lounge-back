import { OrdersModel } from "../model/OrderModel.js";
import { UsersModel } from "../model/UserModel.js";

export const createOrder = async (req, res) => {
  const {
    amount,
    status,
    cashback,
    count,
    note,
    itemsName,
    itemsPrice,
    orderByUserId,
  } = req.body;
  try {
    const newOrder = new OrdersModel({
      amount,
      status,
      cashback,
      count,
      note,
      itemsName,
      itemsPrice,
      orderByUserId,
    });
    await newOrder.save();
    const user = await UsersModel.findByIdAndUpdate(
      orderByUserId,
      { $push: { orders: newOrder._id } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ newOrder, user });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(400).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
};

export const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    await OrdersModel.findByIdAndDelete(id);
    res.status(200).json({
      message: "Order deleted successfully!",
    });
    await UsersModel.updateOne({ orders: id }, { $pull: { orders: id } });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(400).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
};

export const getAllOrdersWithUserInfo = async (req, res) => {
  try {
    const orders = await OrdersModel.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "orderByUserId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          amount: 1,
          status: 1,
          cashback: 1,
          count: 1,
          note: 1,
          itemsName: 1,
          itemsPrice: 1,
          user: {
            _id: "$user._id",
            fullname: "$user.fullname",
            phoneNumber: "$user.phoneNumber",
            countryCode: "$user.countryCode",
          },
        },
      },
    ]);

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error retrieving orders:", error);
    res.status(400).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
};
