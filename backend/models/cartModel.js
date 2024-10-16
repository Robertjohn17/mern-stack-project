const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    productId: {
      ref: "Product",
      type: String,
    },
    quantity: Number,
    userId: {
      ref: "User",
      type: String,
    },
    totalPrice: String,
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
