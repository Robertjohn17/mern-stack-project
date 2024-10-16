import React, { useState, useEffect, useCallback } from "react";
import GetProductByCategory from "../helpers/GetProductByCategory";
import styles from "../styles/VerticalCategoryProduct.module.css";
import Loading from "./Loading";
import { Link } from "react-router-dom";

const serverUrl = "http://localhost:5000";

const VerticalCategoryProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await GetProductByCategory(category);
      const { products } = response;
      setData(products);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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

  return (
    <div className={styles.container}>
      <h2>{heading}</h2>
      <div className={styles.main}>
        {data.map((product) => (
          <Link
            to={`/products/${product.category}`}
            className={styles.dealsContainer}
            key={product._id}
          >
            <div className={styles.imgContainer}>
              <img
                src={`${serverUrl}/uploads/${product.image}`}
                alt={product.name}
                className={styles.img}
              />
            </div>
            <p className={styles.name}>{product.name}</p>
            <p className={styles.price}>
              Just {formatPrice(product.discountedPrice)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default VerticalCategoryProduct;
