const Wishlist = require("../../models/wishlistModel");
const Product = require("../../models/productModel");

const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const currentUser = req.user;

    const isProductAvailable = await Wishlist.findOne({
      productId,
      userId: currentUser._id,
    });

    if (isProductAvailable) {
      return res.json({
        message: "Product already exists in Wishlist",
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
      userId: currentUser._id,
    };

    const newAddToWishlist = new Wishlist(payload);
    const saveProduct = await newAddToWishlist.save();

    return res.json({
      data: saveProduct,
      message: "Product added to Wishlist",
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

module.exports = addToWishlist;
