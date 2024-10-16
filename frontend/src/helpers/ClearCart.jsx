import axios from "axios";
import Cookies from "js-cookie";

const serverUrl = "http://localhost:5000";

export const ClearCart = async () => {
  const token = Cookies.get("token");

  try {
    const response = await axios.post(
      `${serverUrl}/api/cart/deleteAll`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      return { success: true, message: "All items removed from cart" };
    } else {
      return { success: false, message: "Error clearing cart" };
    }
  } catch (error) {
    return { success: false, message: "Error clearing cart" };
  }
};
