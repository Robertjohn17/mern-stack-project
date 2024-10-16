import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import styles from "../styles/Order.module.css";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const serverUrl = "http://localhost:5000";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = Cookies.get("token");

      try {
        const response = await axios.get(`${serverUrl}/api/order`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data.orders);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders", error);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>My Orders</h2>
      {orders.length === 0 ? (
        <p className={styles.noOrders}>You have no orders yet.</p>
      ) : (
        <ul className={styles.orderList}>
          {orders.map((order) => (
            <li key={order._id} className={styles.orderItem}>
              <Link to={`/order/${order._id}`} className={styles.orderLink}>
                <div className={styles.orderDetails}>
                  <p className={styles.orderId}>Order ID: {order._id}</p>
                  <p className={styles.orderTotal}>
                    Total Amount: {order.totalAmount}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;
