const Cart = require("../../models/cartModel");

const getCartItem = async (req, res) => {
  try {
    const currentUser = req.user;
    const cartItems = await Cart.find({ userId: currentUser._id }).populate(
      "productId"
    );
    res.json({
      data: cartItems,
      success: true,
      error: false,
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = getCartItem;
