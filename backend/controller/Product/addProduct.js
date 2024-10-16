const Product = require("../../models/productModel");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("image");

const addProduct = async (req, res) => {
  try {
    upload(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      const {
        name,
        brand,
        description,
        originalPrice,
        discount,
        category,
        stock,
      } = req.body;
      const image = req.file.filename;
      const discountedPrice = Math.floor(
        originalPrice - (originalPrice * discount) / 100
      );

      const product = new Product({
        name: name,
        brand: brand,
        description: description,
        originalPrice: originalPrice,
        discount: discount,
        category: category,
        image: image,
        discountedPrice: discountedPrice,
        stock: stock,
      });
      await product.save();
      res
        .status(201)
        .json({ message: "Product added successfully", product: product });
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = addProduct;
