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
const editProduct = async (req, res) => {
  try {
    upload(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      const { id } = req.params;
      const { name,brand, description, originalPrice, discount, category, stock } =
        req.body;
      const image = req.file;
      const discountedPrice = Math.floor(
        originalPrice - (originalPrice * discount) / 100
      );
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        {
          name: name,
          brand: brand,
          description: description,
          originalPrice: originalPrice,
          discount: discount,
          category: category,
          image: image,
          discountedPrice: discountedPrice,
          stock: stock,
        },
        {
          new: true,
        }
      );
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json(updatedProduct);
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = editProduct;
