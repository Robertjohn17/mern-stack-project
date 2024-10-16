const Cart = require("../../models/cartModel");

const deleteFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const currentUser = req.user;

    const cartItem = await Cart.findOneAndDelete({
      productId,
      userId: currentUser._id,
    });

    if (!cartItem) {
      return res.json({
        message: "Product not found in cart",
        success: false,
        error: true,
      });
    }

    return res.json({
      message: "Product removed from cart",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = deleteFromCart;
