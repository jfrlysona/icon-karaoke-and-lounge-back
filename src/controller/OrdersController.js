import { OrdersModel } from "../model/OrderModel.js";
import { UsersModel } from "../model/UserModel.js";

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await OrdersModel.findById(id)
      .populate("orderByUserId", "fullname phoneNumber countryCode")
      .populate("items.itemId", "name price");

    if (!order) {
      return res.status(404).json("Order is not found!");
    }
    res.status(200).send(order);
  } catch (error) {
    console.error("Error retrieving order by ID:", error);
    res.status(500).json("Internal Server Error");
  }
};

export const createOrder = async (req, res) => {
  const { amount, status, cashback, note, items, orderByUserId } = req.body;
  try {
    const newOrder = new OrdersModel({
      amount,
      status,
      cashback,
      note,
      items,
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

// export const getAllOrders = async (req, res) => {
//   try {
//     const orders = await OrdersModel.aggregate([
//       {
//         $lookup: {
//           from: "users",
//           localField: "orderByUserId",
//           foreignField: "_id",
//           as: "user",
//         },
//       },
//       {
//         $unwind: "$user",
//       },
//       {
//         $lookup: {
//           from: "items",
//           localField: "items.itemId",
//           foreignField: "_id",
//           as: "itemsDetails",
//         },
//       },
     
//       {
//         $project: {
//           amount: 1,
//           status: 1,
//           cashback: 1,
//           note: 1,
//           items: {
//             itemId: "$itemsDetails._id",
//             itemCount: 1,
//             itemName: "$itemsDetails.name",
//             itemPrice: "$itemsDetails.price",
//           },
//           user: {
//             _id: "$user._id",
//             fullname: "$user.fullname",
//             phoneNumber: "$user.phoneNumber",
//             countryCode: "$user.countryCode",
//           },
//         },
//       },
//     ]);

//     res.status(200).json(orders);
//   } catch (error) {
//     console.error("Error retrieving orders:", error);
//     res.status(400).json({
//       message: "Something went wrong!",
//       error: error.message,
//     });
//   }
// };


export const getAllOrders = async (req, res) => {
  try {
    const AllOrders = await OrdersModel.find({});
    res.status(200).json(AllOrders);
  } catch (error) {
    res.status(500).json({ message: "Categories are not found!" });
  }
};