const Product = require("../../models/productModel");

const getBrandsByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const brands = await Product.distinct("brand", { category });
    res.json(brands);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getBrandsByCategory;
