import axios from "axios";
import Cookies from "js-cookie";

const serverUrl = "http://localhost:5000";

const AddToCart = async (e, id) => {
  e.stopPropagation();
  e.preventDefault();

  const token = Cookies.get("token");
  const response = await axios.post(
    `${serverUrl}/api/cart/addToCart`,
    { productId: id, quantity: 1 },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export default AddToCart;
