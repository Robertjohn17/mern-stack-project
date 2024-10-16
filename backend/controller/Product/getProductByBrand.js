const Product = require("../../models/productModel");

const getProductByBrand = async (req, res) => {
  const { brand } = req.params;

  try {
    const products = await Product.find({ brand });

    res.json({
      products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getProductByBrand;
