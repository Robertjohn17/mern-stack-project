import React from "react";
import styles from "../styles/Footer.module.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <p>ABOUT</p>
          <Link className={styles.link}>Contact Us</Link>
          <Link className={styles.link}>About Us</Link>
          <Link className={styles.link}>Careers</Link>
          <Link className={styles.link}>Press</Link>
          <Link className={styles.link}>Cleartrip</Link>
          <Link className={styles.link}>Wholesale</Link>
        </div>
        <div className={styles.footerContent}>
          <p>HELP</p>
          <Link className={styles.link}>Payments</Link>
          <Link className={styles.link}>Shipping</Link>
          <Link className={styles.link}>Cancellation & Returns</Link>
          <Link className={styles.link}>FAQ</Link>
          <Link className={styles.link}>Report Infrigement</Link>
        </div>
        <div className={styles.footerContent}>
          <p>CONSUMER POLICY</p>
          <Link className={styles.link}>Cancellation & Returns</Link>
          <Link className={styles.link}>Terms of Use</Link>
          <Link className={styles.link}>Security</Link>
          <Link className={styles.link}>Privacy</Link>
          <Link className={styles.link}>Sitemap</Link>
        </div>
        <div className={styles.footerContent}>
          <p>SOCIAL</p>
          <Link className={styles.link}>Facebook</Link>
          <Link className={styles.link}>Instagram</Link>
          <Link className={styles.link}>Twitter</Link>
          <Link className={styles.link}>YouTube</Link>
        </div>
      </div>
      <div className={styles.copyright}>
        <p>
          Conditions of Use Privacy Notice Your Ads Privacy Choices <br /> ©
          2023-2024, Pogoo.com, Inc. or its affiliates.
        </p>
      </div>
    </>
  );
};

export default Footer;
