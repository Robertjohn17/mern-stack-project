const express = require("express");
const addProduct = require("../controller/Product/addProduct");
const getAllProducts = require("../controller/Product/getAllProducts");
const getProductById = require("../controller/Product/getProductById");
const editProduct = require("../controller/Product/editProduct");
const deleteProduct = require("../controller/Product/deleteProduct");
const authToken = require("../middleware/authMiddleware");
const getProductByCategory = require("../controller/Product/getProductByCategory");
const searchProduct = require("../controller/Product/searchProduct");
const getBrandsByCategory = require("../controller/Product/getBrandByCategory");
const adminGetProductByCategory = require("../controller/Product/adminGetProductByCategory");
const getProductByBrand = require("../controller/Product/getProductByBrand");
const router = express.Router();

router.get("/", getAllProducts);
router.get("/search", searchProduct);
router.get("/category/:category", getProductByCategory);
router.get("/brand/:brand", getProductByBrand);
router.get("/admin/category/:category", adminGetProductByCategory);
router.get("/brands/:category", getBrandsByCategory);
router.post("/add-products", authToken, addProduct);
router.get("/:id", getProductById);
router.put("/edit-product/:id", authToken, editProduct);
router.delete("/:id", authToken, deleteProduct);

module.exports = router;
