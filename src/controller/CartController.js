const CartModel = require("../model/CartModel");
const ItemsModel = require("../model/ItemsModel");
const UsersModel = require("../model/UserModel");

const addItemToCart = async (req, res) => {
  const { userId, itemId, quantity } = req.body;

  try {
    let cart = await CartModel.findOne({ userId });

    if (!cart) {
      cart = new CartModel({ userId, cartItems: [] });
      await cart.save();

      await UsersModel.findByIdAndUpdate(userId, { cart: cart._id });
    }

    const item = await ItemsModel.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    const existingItemIndex = cart.cartItems.findIndex(cartItem => cartItem.item.toString() === itemId);

    if (existingItemIndex > -1) {
      cart.cartItems[existingItemIndex].quantity += quantity;
    } else {
      cart.cartItems.push({ item: itemId, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeItemFromCart = async (req, res) => {
  const { userId, itemId, quantity } = req.body;

  try {
    const cart = await CartModel.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const existingItemIndex = cart.cartItems.findIndex(cartItem => cartItem.item.toString() === itemId);

    if (existingItemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    if (cart.cartItems[existingItemIndex].quantity > quantity) {
      cart.cartItems[existingItemIndex].quantity -= quantity;
    } else {
      cart.cartItems.splice(existingItemIndex, 1);
    }

    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await CartModel.findOne({ userId }).populate({
      path: 'cartItems.item',
      select: 'name price image'
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const cartDetails = cart.cartItems.map(cartItem => ({
      itemId: cartItem.item._id,
      name: cartItem.item.name,
      price: cartItem.item.price,
      quantity: cartItem.quantity,
      image: cartItem.item.image
    }));

    res.status(200).json(cartDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addItemToCart,
  removeItemFromCart,
  getCart,
};
