import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import styles from "../styles/Home.module.css";
import banner from "../assets/Images/home/lap.jpeg";
import banner1 from "../assets/Images/home/tv.jpeg";
import banner2 from "../assets/Images/home/refrigerator.jpeg";
import CategoryNames from "../components/CategoryNames";
import HorizontalCategoryProducts from "../components/HorizontalCategoryProducts";
import ProductsByBrand from "../components/ProductsByBrand";

const Home = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <div className={styles.main}>
        <CategoryNames />
        <div className={styles.container}>
          <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
              <img src={banner} alt="banner" className={styles.imgBanner} />
            </Carousel.Item>
            <Carousel.Item>
              <img src={banner1} alt="banner" className={styles.imgBanner} />
            </Carousel.Item>
            <Carousel.Item>
              <img src={banner2} alt="banner" className={styles.imgBanner} />
            </Carousel.Item>
          </Carousel>
        </div>
        <HorizontalCategoryProducts
          category={"Mobile"}
          heading={"Popular Smartphones"}
        />
        <HorizontalCategoryProducts
          category={"Headphone"}
          heading={"Top Headphones"}
        />
        <HorizontalCategoryProducts category={"Tv"} heading={"Televisions"} />
        <HorizontalCategoryProducts
          category={"Laptop"}
          heading={"Best Deals on Laptops"}
        />
        <ProductsByBrand
          brand={"Samsung"}
          heading={"Best Deals on this Brand"}
        />
        <ProductsByBrand
          brand={"Sony"}
          heading={"Top Products of Sony"}
        />
      </div>
    </>
  );
};

export default Home;
