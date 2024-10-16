const Cart = require("../../models/cartModel");

const updateCartQuantity = async (req, res) => {
  try {
    const cartId = req.body._id;
    const qty = req.body.quantity;
    const currentUser = req.user;

    const updateProduct = await Cart.updateOne(
      { _id: cartId },
      { ...(qty && { quantity: qty }) }
    );

    res.json({
      message: "Product Updated",
      data: updateProduct,
      error: false,
      success: true,
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = updateCartQuantity;
