import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import styles from "../styles/Cart.module.css";
import { MdRemoveShoppingCart } from "react-icons/md";
import Loading from "../components/Loading";
import MyContext from "../components/Context";
import { toast } from "react-toastify";
import Missing from "../components/Missing";
import { useNavigate } from "react-router-dom";

const serverUrl = "http://localhost:5000";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { fetchCartCount } = useContext(MyContext);
  const navigate = useNavigate();

  const fetchCartItems = async () => {
    const token = Cookies.get("token");
    setLoading(true);
    const response = await axios.get(`${serverUrl}/api/cart/cartItems`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setCartItems(response.data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(price);
  };

  const handleRemove = async (productId) => {
    const token = Cookies.get("token");
    try {
      const response = await axios.post(
        `${serverUrl}/api/cart/removeItem`,
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setCartItems(
          cartItems.filter((item) => item.productId._id !== productId)
        );
        fetchCartCount();
        toast.success("Item removed from cart");
      } else {
        console.error("Error removing item from cart", response.data.message);
        toast.error("Error removing item from cart");
      }
    } catch (error) {
      console.error("Error removing item from cart", error);
      toast.error("Error removing item from cart");
    }
  };

  const updateQuantity = async (id, qty) => {
    const token = Cookies.get("token");
    try {
      const response = await axios.post(
        `${serverUrl}/api/cart/updateCartQuantity`,
        { _id: id, quantity: qty },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        const updatedItems = cartItems.map((item) =>
          item._id === id
            ? {
                ...item,
                quantity: qty,
                totalPrice: item.productId.discountedPrice * qty,
              }
            : item
        );
        setCartItems(updatedItems);
      } else {
        toast.error("Error updating quantity");
      }
    } catch (error) {
      console.error("Error updating quantity", error);
      toast.error("Error updating quantity");
    }
  };

  const increaseQty = (id, qty) => {
    updateQuantity(id, qty + 1);
  };

  const decreaseQty = (id, qty) => {
    if (qty > 1) {
      updateQuantity(id, qty - 1);
    }
  };

  const itemsCount = cartItems.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );
  const total = cartItems.reduce(
    (preve, curr) => preve + curr.quantity * curr.productId.discountedPrice,
    0
  );
  const discount = cartItems.reduce(
    (preve, curr) =>
      preve + curr.productId.originalPrice - curr.productId.discountedPrice,
    0
  );

  const handleProceedToPayment = () => {
    navigate("/payment", { state: { cartItems, total } });
  };

  if (loading) {
    return <Loading />;
  }

  if (cartItems.length === 0) {
    return <Missing />;
  }

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.headingContainer}>
            <h2>Shopping Cart</h2>
          </div>
          <span className={styles.totalPrice}>Price</span>
          {cartItems.map((product) => (
            <div
              className={styles.productContainer}
              key={product.productId._id}
            >
              <div className={styles.imgContainer}>
                <img
                  className={styles.img}
                  src={`${serverUrl}/uploads/${product.productId.image}`}
                  alt={product.productId.name}
                />
              </div>
              <div className={styles.detailsContainer}>
                <p className={styles.name}>{product.productId.name}</p>
                <p
                  className={`${styles.stock} ${
                    product.productId.stock < 5 ? styles.lowStock : ""
                  }`}
                >
                  {product.productId.stock < 5
                    ? `Only ${product.productId.stock} left Hurry up!`
                    : `In stock`}
                </p>
                <p className={styles.brand}>{product.productId.brand}</p>
                <p className={styles.quantityContainer}>
                  Quantity :{" "}
                  <button
                    className={styles.btn}
                    onClick={() => decreaseQty(product._id, product.quantity)}
                  >
                    -
                  </button>
                  <span className={styles.quantity}>{product.quantity}</span>
                  <button
                    className={styles.btn}
                    onClick={() => increaseQty(product._id, product.quantity)}
                  >
                    +
                  </button>
                </p>
              </div>
              <div className={styles.priceContainer}>
                <p className={styles.price}>
                  {formatPrice(product.totalPrice)}
                </p>
                <button
                  className={styles.removeBtn}
                  onClick={() => handleRemove(product.productId._id)}
                >
                  Remove
                  <MdRemoveShoppingCart className={styles.removeIcon} />
                </button>
              </div>
            </div>
          ))}
          <p className={styles.subtotal}>
            Subtotal ({itemsCount} items) : <span>{formatPrice(total)}</span>
          </p>
        </div>
        <div className={styles.summaryContainer}>
          <p className={styles.summary}>Summary</p>
          <div className={styles.itemWrapper}>
            <p className={styles.items}>Total Items</p>
            <span className={styles.span}>{itemsCount}</span>
          </div>
          <div className={styles.itemWrapper}>
            <p className={styles.shipping}>Shipping Charge</p>
            <span className={styles.span}>Free</span>
          </div>
          <div className={styles.itemWrapper}>
            <p className={styles.discount}>Disount</p>
            <span className={styles.discountN}>{discount}/-</span>
          </div>
          <div className={styles.itemWrapper}>
            <p className={styles.total}>Total Amount </p>
            <span className={styles.totalN}>{formatPrice(total)}/-</span>
          </div>
          <div className={styles.orderContainer}>
            <button className={styles.order} onClick={handleProceedToPayment}>
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
