const Cart = require("../../models/cartModel");
const Product = require("../../models/productModel");

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const currentUser = req.user;

    const isProductAvailable = await Cart.findOne({
      productId,
      userId: currentUser._id,
    });

    // console.log("isProductAvailable", isProductAvailable);

    if (isProductAvailable) {
      return res.json({
        message: "Product already exists in Cart",
        success: false,
        error: true,
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.json({
        message: "Product not found",
        success: false,
        error: true,
      });
    }

    const payload = {
      productId: productId,
      quantity: 1,
      userId: currentUser._id,
      totalPrice: quantity * product.discountedPrice,
    };

    const newAddToCart = new Cart(payload);
    const saveProduct = await newAddToCart.save();

    return res.json({
      data: saveProduct,
      message: "Product added to Cart",
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

module.exports = addToCart;
