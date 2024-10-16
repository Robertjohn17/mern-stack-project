import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/ProductByCategory.module.css";
import mobile from "../assets/smartphone-8034911_640.jpg";
import laptop from "../assets/laptop-1626471_640.png";
import tv from "../assets/tv-1625220_640.jpg";
import smartwatch from "../assets/smartwatch-7839487_640.jpg";
import camera from "../assets/camera-541213_640.jpg";
import headphone from "../assets/headphone-1672628_640.jpg";
import homeappliance from "../assets/washing-machine-1167053_640.jpg";

const CategoryNames = () => {
  const categories = [
    { name: "Mobile", displayName: "Mobiles", img: mobile },
    { name: "Laptop", displayName: "Laptops", img: laptop },
    { name: "Headphone", displayName: "Headphones", img: headphone },
    { name: "Tv", displayName: "Tv's", img: tv },
    { name: "Camera", displayName: "Cameras", img: camera },
    {
      name: "Home Appliances",
      displayName: "Appliances",
      img: homeappliance,
    },
    { name: "Watch", displayName: "Watches", img: smartwatch },
  ];

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        {categories.map((category, index) => (
          <Link
            key={index}
            to={`/products/${category.name}`}
            className={styles.category}
          >
            <div className={styles.imgConatiner}>
              <img src={category.img} alt="mobileimg" className={styles.img} />
            </div>
            <div className={styles.name}>{category.displayName}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryNames;
