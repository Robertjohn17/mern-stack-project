import axios from "axios";
import Cookies from "js-cookie";

const serverUrl = "http://localhost:5000";

const PlaceOrder = async (
  cartItems,
  total,
  selectedPaymentMethod,
  formData
) => {
  const token = Cookies.get("token");
  const response = await axios.post(
    `${serverUrl}/api/order/placeOrder`,
    {
      items: cartItems,
      totalAmount: total,
      selectedPaymentMethod: selectedPaymentMethod,
      formData: formData,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export default PlaceOrder;
