const Cart = require("../../models/cartModel");

const deleteAllItems = async (req, res) => {
  try {
    const currentUser = req.user;

    await Cart.deleteMany({
      userId: currentUser._id,
    });

    return res.json({
      message: "All Items removed from cart",
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

module.exports = deleteAllItems;
