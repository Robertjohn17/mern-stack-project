import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../styles/AdminSideBar.module.css";

const AdminSideBar = ({ open }) => {
  const [showCategories, setShowCategories] = useState(open);
  const location = useLocation();
  const currentCategory = decodeURIComponent(location.pathname.split("/")[3]);

  useEffect(() => {
    setShowCategories(open);
  }, [open]);

  const categories = [
    { name: "Mobile", displayName: "Mobiles" },
    { name: "Laptop", displayName: "Laptops" },
    { name: "Headphone", displayName: "Headphones" },
    { name: "Tv", displayName: "Tv's" },
    { name: "Camera", displayName: "Cameras" },
    { name: "Home Appliances", displayName: "Home Appliance" },
    { name: "Watch", displayName: "Watches" },
  ];

  return (
    <div className={styles.container}>
      <span
        className={styles.sidebarName}
        onClick={() => setShowCategories(!showCategories)}
      >
        Products
      </span>
      {showCategories && (
        <div className={styles.categoryList}>
          {categories.map((category, index) => (
            <Link
              key={index}
              to={`/admin/products/${category.name}`}
              className={`${styles.sidebarCategory} ${
                currentCategory === category.name ? styles.active : ""
              }`}
            >
              {category.displayName}
            </Link>
          ))}
        </div>
      )}
      <Link to="/admin/all-users" className={styles.sidebarName}>
        Users
      </Link>
    </div>
  );
};

export default AdminSideBar;
