import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { MdEditDocument } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import styles from "../styles/DisplayAllProduct.module.css";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import Loading from "./Loading";
import Pagination from "./Pagination";

const serverUrl = "http://localhost:5000";
const PRODUCTS_PER_PAGE = 8;

const DisplayAllProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const fetchProducts = useCallback(async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(`${serverUrl}/api/products`, {
        params: { page, limit: PRODUCTS_PER_PAGE },
      });
      setProducts(response.data.products);
      setTotalProducts(response.data.totalProducts);
    } catch (error) {
      console.error("Error fetching Product:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage, fetchProducts]);

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);

  const handleDelete = (productId) => {
    confirmAlert({
      customUI: ({ onClose }) => (
        <div className={styles.confirmAlert}>
          <h1>Confirm to Submit</h1>
          <p>Are you sure you want to delete this Product?</p>
          <div className={styles.confirmAlertButtons}>
            <button
              onClick={async () => {
                try {
                  const token = Cookies.get("token");
                  await axios.delete(`${serverUrl}/api/products/${productId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                  });
                  setProducts((prevProducts) =>
                    prevProducts.filter((product) => product._id !== productId)
                  );
                  toast.success("Product deleted successfully");
                  fetchProducts(currentPage);
                } catch (error) {
                  console.error("Error deleting Product:", error);
                }
                onClose();
              }}
            >
              Yes
            </button>
            <button onClick={onClose}>No</button>
          </div>
        </div>
      ),
      overlayClassName: styles.confirmAlertOverlay,
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.containerTwo}>
      <div className={styles.productContainer}>
        {products.map((product) => (
          <div className={styles.products} key={product._id}>
            <div className={styles.imageContainer}>
              <img
                src={`${serverUrl}/uploads/${product.image}`}
                alt={product.name}
                className={styles.img}
              />
            </div>
            <div className={styles.productDetails}>
              <p className={styles.name}>{product.name}</p>
              <p className={styles.brand}>{product.brand}</p>
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
                <span className={styles.discount}>
                  ({product.discount}% OFF)
                </span>
              </p>
              <Link
                to={`/admin/edit-products/${product._id}`}
                className={styles.editIcon}
              >
                <MdEditDocument
                  data-tooltip-id={`edit-tooltip-${product._id}`}
                  data-tooltip-content="Edit"
                />
                <Tooltip
                  id={`edit-tooltip-${product._id}`}
                  place="top"
                  type="dark"
                  effect="solid"
                />
              </Link>
              <div
                className={styles.deleteIcon}
                onClick={() => handleDelete(product._id)}
              >
                <FaTrash
                  data-tooltip-id={`delete-tooltip-${product._id}`}
                  data-tooltip-content="Delete"
                />
                <Tooltip
                  id={`delete-tooltip-${product._id}`}
                  place="top"
                  type="dark"
                  effect="solid"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalItems={totalProducts}
        itemsPerPage={PRODUCTS_PER_PAGE}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default DisplayAllProduct;
