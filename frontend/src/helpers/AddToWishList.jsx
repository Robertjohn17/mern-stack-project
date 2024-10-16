import axios from "axios";
import Cookies from "js-cookie";

const serverUrl = "http://localhost:5000";

const AddToWishlist = async (id) => {
  const token = Cookies.get("token");
  try {
    const response = await axios.post(
      `${serverUrl}/api/wishlist/addToWishlist`,
      { productId: id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    return { success: false, message: error.message || error };
  }
};

export default AddToWishlist;
