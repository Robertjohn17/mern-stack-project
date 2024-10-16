const Wishlist = require("../../models/wishlistModel");

const getWishlistItem = async (req, res) => {
  try {
    const currentUser = req.user;
    const wishlistItems = await Wishlist.find({
      userId: currentUser._id,
    }).populate("productId");
    res.json({
      data: wishlistItems,
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

module.exports = getWishlistItem;
