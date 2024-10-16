import React from "react";
import Loader from "./Loader";
import styles from "../styles/Loading.module.css";

const Loading = () => {
  return (
    <div className={styles.loadingScreen}>
      <Loader />
    </div>
  );
};

export default Loading;
