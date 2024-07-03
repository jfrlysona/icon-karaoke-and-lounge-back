const ItemsModel = require("../model/ItemsModel.js");
const OrdersModel = require("../model/OrderModel.js");
const UsersModel = require("../model/UserModel.js");

const getAllOrders = async (req, res) => {
  try {
    // const orders = await OrdersModel.find()
    //   .populate({
    //     path: "orderByUserId",
    //     select: "fullname role gender phoneNumber countryCode",
    //   })
    //   .populate({
    //     path: "items.itemId",
    //     select: "name price",
    //   });

    const orders = await OrdersModel.find()
      .populate({
        path: "orderByUserId",
        select: "fullname role gender email",
      })
      .populate({
        path: "items.itemId",
        select: "name price",
      });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    // const order = await OrdersModel.findById(id)
    //   .populate({
    //     path: "orderByUserId",
    //     select: "fullname role gender phoneNumber countryCode",
    //   })
    //   .populate({
    //     path: "items.itemId",
    //     select: "name price",
    //   });

    const order = await OrdersModel.findById(id)
      .populate({
        path: "orderByUserId",
        select: "fullname role gender email",
      })
      .populate({
        path: "items.itemId",
        select: "name price",
      });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createOrder = async (req, res) => {
  const { amount, items, orderByUserId, promocode, paymentMethod } = req.body;

  try {
    const user = await UsersModel.findById(orderByUserId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    for (let item of items) {
      const foundItem = await ItemsModel.findById(item.itemId);
      if (!foundItem) {
        return res
          .status(404)
          .json({ message: `Item with ID ${item.itemId} not found` });
      }
    }

    const newOrder = new OrdersModel({
      amount,
      items,
      orderByUserId,
      promocode,
      paymentMethod,
    });

    const savedOrder = await newOrder.save();

    user.orders.push(savedOrder._id);
    await user.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await OrdersModel.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await OrdersModel.findByIdAndDelete(id);
    await UsersModel.updateOne({ orders: id }, { $pull: { orders: id } });
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
};
