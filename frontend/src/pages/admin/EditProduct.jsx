import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "../../styles/EditProduct.module.css";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const serverUrl = "http://localhost:5000";

const EditProduct = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    description: "",
    originalPrice: "",
    discount: "",
    category: "",
    stock: "",
    image: null,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/api/products/${id}`
        );
        const productData = response.data;
        setFormData({
          name: productData.name,
          brand: productData.brand,
          description: productData.description,
          originalPrice: productData.originalPrice,
          discount: productData.discount,
          category: productData.category,
          stock: productData.stock,
          image: productData.image,
        });
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

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
      formDataUpload.append("discountedPrice", formData.discountedPrice);
      formDataUpload.append("category", formData.category);
      formDataUpload.append("stock", formData.stock);

      await axios.put(
        `${serverUrl}/api/products/edit-product/${id}`,
        formDataUpload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Product Updated Successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h3>Edit Product</h3>
        <div className={styles.input}>
          <label>Name</label>
          <input
            className={styles.inputs}
            type="text"
            name="brand"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className={styles.input}>
          <label>Brand</label>
          <input
            className={styles.inputs}
            type="text"
            name="brand"
            placeholder="Brand"
            value={formData.brand}
            onChange={handleChange}
          />
        </div>
        <div className={styles.input}>
          <label>Category</label>
          <input
            className={styles.inputs}
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
          />
        </div>
        <div className={styles.input}>
          <label>Description</label>
          <input
            className={styles.inputs}
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className={styles.input}>
          <label>Price</label>
          <input
            className={styles.inputs}
            type="number"
            name="originalPrice"
            placeholder="Original Price"
            value={formData.originalPrice}
            onChange={handleChange}
          />
        </div>
        <div className={styles.input}>
          <label>Discount</label>
          <input
            className={styles.inputs}
            type="number"
            name="discount"
            placeholder="Discount"
            value={formData.discount}
            onChange={handleChange}
          />
        </div>
        <div className={styles.input}>
          <label>Stock</label>
          <input
            className={styles.inputs}
            type="number"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
          />
        </div>
        <div className={styles.input}>
          <label>Image</label>
          <input
            className={styles.inputs}
            type="file"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        <button className={styles.btn} type="submit">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
