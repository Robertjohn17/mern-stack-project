const express = require("express");
const authToken = require("../middleware/authMiddleware");
const addToWishlist = require("../controller/Wishlist/addToWishlist");
const getWishlistItem = require("../controller/Wishlist/getWishlistItems");
const deleteFromWishlist = require("../controller/Wishlist/deleteFromWishlist");
const router = express.Router();

router.post("/addToWishlist", authToken, addToWishlist);
router.get("/wishlistItems", authToken, getWishlistItem);
router.post("/removeFromWishlist", authToken, deleteFromWishlist);

module.exports = router;
