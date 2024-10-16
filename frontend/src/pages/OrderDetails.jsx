import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import styles from "../styles/OrderDetails.module.css";
import { toast } from "react-toastify";

const serverUrl = "http://localhost:5000";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const token = Cookies.get("token");

      try {
        const response = await axios.get(`${serverUrl}/api/order/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrder(response.data.order);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching order details", error);
        toast.error("Error fetching order details");
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!order) {
    return <div>No order details available</div>;
  }

  return (
    <div className={styles.container}>
      <h2>Order Details</h2>
      <div className={styles.orderInfo}>
        <p>
          <strong>Order ID:</strong> {order._id}
        </p>
        <p>
          <strong>Total Amount:</strong> {order.totalAmount}
        </p>
        <p>
          <strong>Payment Type:</strong> {order.selectedPaymentMethod}
        </p>
        <p>
          <strong>Order Date:</strong>{" "}
          {new Date(order.createdAt).toLocaleDateString()}
        </p>
        <p>
          <strong>Items:</strong>
        </p>
        <ul>
          {order.items.map((item) => (
            <li key={item.productId._id}>
              <p>
                <strong>Product:</strong> {item.productId.name}
              </p>
              <p>
                <strong>Quantity:</strong> {item.quantity}
              </p>
              <p>
                <strong>Total Price:</strong> {item.totalPrice}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderDetails;
