import axios from "axios";

const serverUrl = "http://localhost:5000";

const GetProductByBrand = async (brand) => {
  const response = await axios.get(`${serverUrl}/api/products/brand/${brand}`);

  return response.data;
};

export default GetProductByBrand;
