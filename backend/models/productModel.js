const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Enter Product Name"] },
    image: { type: String, required: [true, "Please Select Image"] },
    brand: { type: String, required: [true, "Enter Product Brand"] },
    description: {
      type: String,
      required: [true, "Enter Product Description"],
    },
    originalPrice: { type: Number, required: [true, "Enter Product Price"] },
    discount: {
      type: Number,
      required: [true, "Enter Product Discount "],
    },
    discountedPrice: { type: Number },
    category: { type: String, required: [true, "Enter Product Category"] },
    stock: { type: Number, required: [true, "Enter Available Product"] },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
