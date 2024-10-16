const express = require("express");
const authToken = require("../middleware/authMiddleware");
const placeOrder = require("../controller/Order/placeOrder");
const orderDetails = require("../controller/Order/orderDetails");
const getOrders = require("../controller/Order/getOrder");
const router = express.Router();

router.post("/placeOrder", authToken, placeOrder);
router.get("/:id", authToken, orderDetails);
router.get("/", authToken, getOrders);

module.exports = router;
