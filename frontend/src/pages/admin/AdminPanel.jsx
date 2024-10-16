import React from "react";
import styles from "../../styles/AdminPanel.module.css";
import DisplayAllProduct from "../../components/DisplayAllProduct";
import AdminSideBar from "../../components/AdminSideBar";

const AdminPanel = () => {
  return (
    <>
      <div className={styles.main}>
        <AdminSideBar />
        <DisplayAllProduct />
      </div>
    </>
  );
};

export default AdminPanel;
