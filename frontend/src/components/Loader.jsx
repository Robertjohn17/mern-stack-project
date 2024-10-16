import React from "react";
import { Hourglass } from "react-loader-spinner";
import styles from "../styles/Loading.module.css";

const Loader = ({ size = 80, color = "black", loading = true, ...props }) => {
  return (
    <div className={styles.loaderContainer} {...props}>
      <Hourglass
        height={size}
        width={size}
        radius="9"
        color={color}
        ariaLabel="three-dots-loading"
        visible={loading}
      />
    </div>
  );
};

export default Loader;
