import React, { useState } from "react";
import axios from "axios";
import styles from "../../styles/EditProduct.module.css";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const serverUrl = "http://localhost:5000";

const AddProducts = () => {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    description: "",
    category: "",
    discount: "",
    originalPrice: "",
    stock: "",
    image: null,
  });

  const categories = [
    "Camera",
    "Headphone",
    "Home Appliances",
    "Laptop",
    "Mobile",
    "Tv",
    "Watch",
  ];

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get("token");
      if (!token) {
        console.error("Token is missing");
        return;
      }
      const formDataUpload = new FormData();
      formDataUpload.append("name", formData.name);
      formDataUpload.append("brand", formData.brand);
      formDataUpload.append("description", formData.description);
      formDataUpload.append("originalPrice", formData.originalPrice);
      formDataUpload.append("discount", formData.discount);
      formDataUpload.append("image", formData.image);
      formDataUpload.append("category", formData.category);
      formDataUpload.append("stock", formData.stock);

      const response = await axios.post(
        `${serverUrl}/api/products/add-products`,
        formDataUpload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("New Product Added Successfully");
      console.log(response.data);
      setFormData({
        name: "",
        brand: "",
        description: "",
        category: "",
        discount: "",
        originalPrice: "",
        stock: "",
        image: null,
      });
      e.target.reset();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product");
    }
  };

  return (
    <>
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h3>Add New Product</h3>
          <div className={styles.input}>
            <input
              className={styles.inputs}
              type="text"
              name="name"
              placeholder="Product Name"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className={styles.input}>
            <input
              className={styles.inputs}
              type="text"
              name="brand"
              required
              placeholder="Brand Name"
              value={formData.brand}
              onChange={handleChange}
            />
          </div>
          <div className={styles.input}>
            <input
              className={styles.inputs}
              type="text"
              name="description"
              required
              placeholder="Product Description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className={styles.input}>
            <select
              className={styles.inputs}
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Category
              </option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.input}>
            <input
              className={styles.inputs}
              type="number"
              required
              name="originalPrice"
              placeholder="Product Price"
              value={formData.originalPrice}
              onChange={handleChange}
            />
          </div>
          <div className={styles.input}>
            <input
              className={styles.inputs}
              type="text"
              name="discount"
              required
              placeholder="Discount"
              value={formData.discount}
              onChange={handleChange}
            />
          </div>
          <div className={styles.input}>
            <input
              className={styles.inputs}
              type="number"
              name="stock"
              required
              placeholder="Available Products"
              value={formData.stock}
              onChange={handleChange}
            />
          </div>
          <div className={styles.input}>
            <input
              className={styles.inputs}
              type="file"
              required
              accept="image/*"
              name="image"
              onChange={handleChange}
            />
          </div>
          <button className={styles.btn} type="submit">
            Add Product
          </button>
        </form>
      </div>
    </>
  );
};

export default AddProducts;
