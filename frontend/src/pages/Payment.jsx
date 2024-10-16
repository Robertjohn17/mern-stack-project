import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../styles/Payment.module.css";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
import PlaceOrder from "../helpers/PlaceOrder";
import { ClearCart } from "../helpers/ClearCart";
import MyContext from "../components/Context";
import { FaCreditCard, FaMoneyBillWave, FaMobileAlt } from "react-icons/fa";
import gpay from "../assets/Images/gpay.png";
import phonepe from "../assets/Images/phonepe.png";
import bharatpe from "../assets/Images/bharat.png";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";

const serverUrl = "http://localhost:5000";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { fetchCartCount } = useContext(MyContext);
  const { cartItems, total } = location.state || {};
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [selectedUpiMethod, setSelectedUpiMethod] = useState("");
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    address: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullname: user.fullname || "",
        email: user.email || "",
        address: user.address || "",
        phoneNumber: user.phoneNumber || "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (!cartItems || !total) {
      navigate("/cart");
    }
  }, [cartItems, total, navigate]);

  const handleClearCart = async () => {
    const result = await ClearCart();
    if (result.success) {
      fetchCartCount();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePaymentSubmit = async () => {
    if (!selectedPaymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    if (!formData.fullname || !formData.phoneNumber || !formData.address) {
      toast.error("Please fill out your details");
      return;
    }

    try {
      const token = Cookies.get("token");

      const formDataUpload = new FormData();
      formDataUpload.append("fullname", formData.fullname);
      formDataUpload.append("address", formData.address);
      formDataUpload.append("phoneNumber", formData.phoneNumber);
      formDataUpload.append("email", formData.email);

      const responseData = await axios.put(
        `${serverUrl}/api/user/editprofile`,
        formDataUpload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedUser = responseData.data.updatedUser;
      dispatch(setUser(updatedUser));

      const orderResponse = await PlaceOrder(
        cartItems,
        total,
        selectedPaymentMethod,
        formData
      );

      if (orderResponse && orderResponse.success) {
        toast.success("Order Placed Successfully");
        navigate("/orders");
        handleClearCart();
      } else {
        toast.error(orderResponse.message || "Error placing order");
      }
    } catch (error) {
      toast.error("An error occurred while processing the payment");
      console.error(error);
    }
  };

  return (
    <div className={styles.paymentContainer}>
      <h2 className={styles.title}>Payment Details</h2>

      <div className={styles.userDetails}>
        <h3>User Details</h3>
        <input
          type="text"
          name="fullname"
          placeholder="Full Name"
          value={formData.fullname}
          onChange={handleInputChange}
          className={styles.inputField}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          className={styles.inputField}
          disabled={!!user}
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          className={styles.inputField}
        />
        <textarea
          name="address"
          placeholder="Delivery Address"
          value={formData.address}
          onChange={handleInputChange}
          className={styles.textArea}
        />
      </div>

      <div className={styles.orderSummary}>
        <h3>Order Summary</h3>
        <p>Total Items: {cartItems?.length}</p>
        <p>Total Price: ₹{total}</p>
      </div>

      <div className={styles.paymentMethods}>
        <h3>Select Payment Method</h3>
        <label className={styles.method}>
          <input
            type="radio"
            value="UPI"
            checked={selectedPaymentMethod === "UPI"}
            onChange={(e) => {
              setSelectedPaymentMethod(e.target.value);
              setSelectedUpiMethod("");
            }}
          />
          <FaMobileAlt className={styles.icon} />
          UPI
        </label>
        {selectedPaymentMethod === "UPI" && (
          <div className={styles.upiMethods}>
            <h4>Select UPI Method</h4>
            <label className={styles.upiMethod}>
              <input
                type="radio"
                value="GooglePay"
                checked={selectedUpiMethod === "GooglePay"}
                onChange={(e) => setSelectedUpiMethod(e.target.value)}
              />
              <img src={gpay} alt="Google Pay" className={styles.upiLogo} />
              Google Pay
            </label>
            <label className={styles.upiMethod}>
              <input
                type="radio"
                value="PhonePe"
                checked={selectedUpiMethod === "PhonePe"}
                onChange={(e) => setSelectedUpiMethod(e.target.value)}
              />
              <img src={phonepe} alt="PhonePe" className={styles.upiLogo} />
              PhonePe
            </label>
            <label className={styles.upiMethod}>
              <input
                type="radio"
                value="BharatQR"
                checked={selectedUpiMethod === "BharatQR"}
                onChange={(e) => setSelectedUpiMethod(e.target.value)}
              />
              <img src={bharatpe} alt="BharatQR" className={styles.upiLogo} />
              Bharat QR
            </label>
          </div>
        )}

        <label className={styles.method}>
          <input
            type="radio"
            value="Card"
            checked={selectedPaymentMethod === "Card"}
            onChange={(e) => {
              setSelectedPaymentMethod(e.target.value);
              setSelectedUpiMethod(""); 
            }}
          />
          <FaCreditCard className={styles.icon} />
          Credit / Debit Card
        </label>

        {selectedPaymentMethod === "Card" && (
          <div className={styles.cardDetails}>
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              className={styles.inputField}
            />
            <input
              type="text"
              name="expiryDate"
              placeholder="Expiry Date (MM/YY)"
              className={styles.inputField}
            />
            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              className={styles.inputField}
            />
          </div>
        )}

        <label className={styles.method}>
          <input
            type="radio"
            value="CashOnDelivery"
            checked={selectedPaymentMethod === "CashOnDelivery"}
            onChange={(e) => {
              setSelectedPaymentMethod(e.target.value);
              setSelectedUpiMethod(""); 
            }}
          />
          <FaMoneyBillWave className={styles.icon} />
          Cash on Delivery
        </label>
      </div>

      <button className={styles.submitBtn} onClick={handlePaymentSubmit}>
        Confirm and Pay
      </button>
    </div>
  );
};

export default Payment;
