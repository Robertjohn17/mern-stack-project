import axios from "axios";
import Cookies from "js-cookie";

const serverUrl = "http://localhost:5000";

const RemoveFromWishlist = async (id) => {
  const token = Cookies.get("token");

  try {
    const response = await axios.post(
      `${serverUrl}/api/wishlist/removeFromWishlist`,
      { productId: id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    return { success: false, message: error.message || error };
  }
};

export default RemoveFromWishlist;
