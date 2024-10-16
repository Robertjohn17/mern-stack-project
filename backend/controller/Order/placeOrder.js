const Order = require("../../models/orderModel");

const placeOrder = async (req, res) => {
  try {
    const { items, totalAmount, selectedPaymentMethod} = req.body;

    const order = new Order({
      user: req.user._id,
      items,
      totalAmount,
      selectedPaymentMethod,
    });

    await order.save();
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, message: "Error placing order" });
  }
};

module.exports = placeOrder;
