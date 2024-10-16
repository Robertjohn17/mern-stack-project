const Product = require("../../models/productModel");

const getProductByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const products = await Product.find({ category });

    const totalProducts = products.length;

    res.json({
      products,
      totalProducts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getProductByCategory;
