const Order = require("../../models/orderModel");

const orderDetails = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId).populate("items.productId");

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Error fetching order details:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching order details" });
  }
};

module.exports= orderDetails
