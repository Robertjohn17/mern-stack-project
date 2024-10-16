import React from "react";
import styles from "../styles/Missing.module.css";
import cart from "../assets/image.png";
import { Link } from "react-router-dom";

const Missing = () => {
  return (
    <div className={styles.maincontainer}>
      <div className={styles.ifcontainer}>
        <img src={cart} alt="" className={styles.cartimg} />
        <p className={styles.p}>Missing Items?</p>
        <Link to="/" className={styles.addProduct}>
          Add Products
        </Link>
      </div>
    </div>
  );
};

export default Missing;
