import React, { useContext } from "react";
import Loading from "../components/Loading";
import styles from "../styles/Wishlist.module.css";
import { IoCartOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import MyContext from "../components/Context";
import AddToCart from "../helpers/AddToCart";
import RemoveFromWishlist from "../helpers/RemoveFromWishlist";
import Missing from "../components/Missing";

const serverUrl = "http://localhost:5000";

const Wishlist = () => {
  const { loading, wishlistItems, fetchCartCount, setWishlistItems } =
    useContext(MyContext);
  const user = useSelector((state) => state.auth.user);

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

  const handleRemoveFromWishlist = async (id) => {
    if (user) {
      const response = await RemoveFromWishlist(id);
      if (response && response.success) {
        const updatedWishlist = wishlistItems.filter(
          (item) => item.productId._id !== id
        );
        setWishlistItems(updatedWishlist);
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } else {
      toast.info("Please Login to Continue");
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return <Loading />;
  }

  if (wishlistItems.length === 0) {
    return <Missing />;
  }

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.headingContainer}>
            <h2>Wishlist</h2>
          </div>
          {wishlistItems.map((product) => (
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
                <p className={styles.price}>
                  {formatPrice(product.productId.discountedPrice)}
                  <span className={styles.originalPrice}>
                    {formatPrice(product.productId.originalPrice)}
                  </span>
                  <span className={styles.discount}>
                    ({product.productId.discount}% OFF)
                  </span>
                </p>
              </div>
              <div className={styles.priceContainer}>
                <MdDelete
                  className={styles.deleteIcon}
                  onClick={() =>
                    handleRemoveFromWishlist(product.productId._id)
                  }
                />
                <button
                  className={styles.addBtn}
                  onClick={(e) => handleAddToCart(e, product.productId._id)}
                >
                  <IoCartOutline className={styles.addIcon} />
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
