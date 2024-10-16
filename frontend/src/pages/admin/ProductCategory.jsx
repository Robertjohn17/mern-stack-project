import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "../../styles/ProductCategory.module.css";
import Loading from "../../components/Loading";
import AdminSideBar from "../../components/AdminSideBar";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import Pagination from "../../components/Pagination";

const serverUrl = "http://localhost:5000";
const PRODUCTS_PER_PAGE = 16;

const ProductCategory = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [showOptions, setShowOptions] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${serverUrl}/api/products/admin/category/${category}`,
          {
            params: { limit: PRODUCTS_PER_PAGE, page: currentPage },
          }
        );
        console.log(response);
        setProducts(response.data.products);
        setTotalProducts(response.data.totalProducts);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, [category, currentPage]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const toggleOptions = (productId) => {
    setShowOptions((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

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
    <div className={styles.main}>
      <AdminSideBar open={true} />
      <div className={styles.container}>
        <div className={styles.headingContainer}>
          <h2>
            {category.charAt(0).toUpperCase() + category.slice(1)} Products
          </h2>
          <Link to="/admin/add-products" className={styles.addProducts}>
            Add Products
          </Link>
        </div>
        <div className={styles.wapper}>
          {products.map((product) => (
            <div className={styles.productContainer} key={product._id}>
              <div className={styles.imgContainer}>
                <div className={styles.optionsContainer}>
                  <MdOutlineModeEditOutline
                    className={styles.optionsIcon}
                    onClick={() => toggleOptions(product._id)}
                  />
                  {showOptions[product._id] && (
                    <div className={styles.optionsMenu}>
                      <Link
                        to={`/admin/edit-products/${product._id}`}
                        className={styles.editOption}
                      >
                        <FaEdit />
                        Edit
                      </Link>
                      <div
                        className={styles.deleteOption}
                        onClick={() => handleDelete(product._id)}
                      >
                        <FaTrash />
                        Delete
                      </div>
                    </div>
                  )}
                </div>
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
    </div>
  );
};

export default ProductCategory;
