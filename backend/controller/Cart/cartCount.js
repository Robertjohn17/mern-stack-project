const Cart = require("../../models/cartModel");

const cartCount = async (req,res) => {
  try {
    const currentUser = req.user;

      const count = await Cart.countDocuments({ userId: currentUser._id });
      res.json({
        data: {
          count: count,
        },
        message: "Product Count",
        error: false,
        success: true,
      });
  } catch (error) {
      res.json({
        message: error.message || error,
        error: false,
        success: false,
      });
  }
};

module.exports = cartCount;
