import axios from "axios";

const serverUrl = "http://localhost:5000";

const GetProductByCategory = async (category, page, limit) => {
  const response = await axios.get(
    `${serverUrl}/api/products/category/${category}`,
    {
      params: { page, limit },
    }
  );
   
  return response.data;
};

export default GetProductByCategory;
