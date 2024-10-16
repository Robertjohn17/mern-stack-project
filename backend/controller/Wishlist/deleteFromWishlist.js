const Wishlist = require("../../models/wishlistModel");

const deleteFromWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const currentUser = req.user;

    const wishlistItem = await Wishlist.findOneAndDelete({
      productId,
      userId: currentUser._id,
    });

    if (!wishlistItem) {
      return res.json({
        message: "Product not found in wishlist",
        success: false,
        error: true,
      });
    }

    return res.json({
      message: "Product removed from wishlist",
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

module.exports = deleteFromWishlist;
