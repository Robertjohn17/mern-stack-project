const Product = require("../../models/productModel");

const adminGetProductByCategory = async (req, res) => {
  const { category } = req.params;
  const { page = 1, limit = 16 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const products = await Product.find({ category })
      .skip(Number(offset))
      .limit(Number(limit));

    const totalProducts = await Product.countDocuments({ category });
    const totalPages = Math.ceil(totalProducts / limit);

    res.json({
      products,
      totalProducts,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = adminGetProductByCategory;
