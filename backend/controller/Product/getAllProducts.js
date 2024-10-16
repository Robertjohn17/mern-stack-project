const Product = require("../../models/productModel");

const getAllProducts = async (req, res) => {
  const { page = 1, limit = 8 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const products = await Product.find()
      .skip(Number(offset))
      .limit(Number(limit));
    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / limit);

    res.json({ products, totalPages, totalProducts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getAllProducts;
