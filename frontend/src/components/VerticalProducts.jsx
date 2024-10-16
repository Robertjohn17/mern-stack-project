import React, { useContext } from "react";
import styles from "../styles/VerticalProducts.module.css";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import AddToCart from "../helpers/AddToCart";
import MyContext from "./Context";

const serverUrl = "http://localhost:5000";

const VerticalProducts = ({ loading, data = [] }) => {
  const user = useSelector((state) => state.auth.user);
  const { fetchCartCount } = useContext(MyContext);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(price);
  };

  const handleAddToCart = async (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    if (user) {
      const response = await AddToCart(e, id);
      fetchCartCount();
      if (response && response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } else {
      toast.info("Please Login to Continue");
    }
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className={styles.wapper}>
      {data.map((product) => (
        <Link
          to={`/products/details/${product._id}`}
          className={styles.productContainer}
          key={product._id}
        >
          <div className={styles.imgContainer}>
            <img
              src={`${serverUrl}/uploads/${product.image}`}
              alt={product.name}
              className={styles.img}
            />
          </div>
          <div className={styles.detailsContainer}>
            <p className={styles.name}>{product.name}</p>
            <p className={styles.brand}>{product.brand}</p>
            <p
              className={`${styles.stock} ${
                product.stock < 5 ? styles.lowStock : ""
              }`}
            >
              {product.stock < 5
                ? `Only ${product.stock} left Hurry up!`
                : `${product.stock} Available`}
            </p>
            <p className={styles.price}>
              {formatPrice(product.discountedPrice)}
              <span className={styles.originalPrice}>
                {formatPrice(product.originalPrice)}
              </span>
              <span className={styles.discount}>({product.discount}% OFF)</span>
            </p>
            <button
              className={styles.btn}
              onClick={(e) => handleAddToCart(e, product._id)}
            >
              Add to Cart
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default VerticalProducts;
