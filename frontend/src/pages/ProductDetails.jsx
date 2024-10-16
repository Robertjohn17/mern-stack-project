import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import styles from "../styles/ProductDetails.module.css";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import AddToCart from "../helpers/AddToCart";
import { toast } from "react-toastify";
import MyContext from "../components/Context";
import { useSelector } from "react-redux";
import VerticalCategoryProduct from "../components/VerticalCategoryProduct";

const serverUrl = "http://localhost:5000";

const ProductDetails = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { fetchCartCount } = useContext(MyContext);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${serverUrl}/api/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
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
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.productContainer}>
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
            <p className={styles.star}>
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </p>
            <p
              className={`${styles.stock} ${
                product.stock < 5 ? styles.lowStock : ""
              }`}
            >
              {product.stock < 5
                ? `Only ${product.stock} left!`
                : `${product.stock} Available`}
            </p>
            <p className={styles.price}>
              {formatPrice(product.discountedPrice)}
              <span className={styles.originalPrice}>
                {formatPrice(product.originalPrice)}
              </span>
              <span className={styles.discount}>({product.discount}% OFF)</span>
            </p>
            <div className={styles.btnContainer}>
              <button
                className={styles.addBtn}
                onClick={(e) => handleAddToCart(e, product._id)}
              >
                <IoCartOutline className={styles.addIcon} />
                Add To Cart
              </button>
            </div>
            <p className={styles.description}>
              <span>Description :</span> {product.description}
            </p>
          </div>
        </div>
      </div>
      <VerticalCategoryProduct
        category={product.category}
        heading={"Recommended Products"}
      />
    </div>
  );
};

export default ProductDetails;
