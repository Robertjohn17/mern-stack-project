const express = require("express");
const authToken = require("../middleware/authMiddleware");
const addToCart = require("../controller/Cart/addToCart");
const getCartItem = require("../controller/Cart/getCartItems");
const cartCount = require("../controller/Cart/cartCount");
const deleteFromCart = require("../controller/Cart/deleteFromCart");
const updateCartQuantity = require("../controller/Cart/updateCartQuantity");
const deleteAllItems = require("../controller/Cart/deleteAllItems");
const router = express.Router();

router.post("/addToCart", authToken, addToCart);
router.get("/cartItems", authToken, getCartItem);
router.get("/count", authToken, cartCount);
router.post("/removeItem", authToken, deleteFromCart);
router.post("/updateCartQuantity", authToken, updateCartQuantity);
router.post("/deleteAll", authToken, deleteAllItems);

module.exports = router;
