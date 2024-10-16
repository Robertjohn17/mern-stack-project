const Product = require("../../models/productModel");

const searchProduct = async (req, res) => {
  const {query} = req.query;

  if (!query) {
    return res.status(400).json({ message: "Query parameter is required" });
  }
  try {
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { brand: { $regex: query, $options: "i" } },
      ],
    });

    res.json(products);
  } catch (error) {
    console.error("Error in searchProduct:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = searchProduct;
