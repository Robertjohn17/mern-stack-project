import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "../styles/Products.module.css";
import GetProductByCategory from "../helpers/GetProductByCategory";
import Loading from "../components/Loading";
import { toast } from "react-toastify";
import CategoryNames from "../components/CategoryNames";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import AddToCart from "../helpers/AddToCart";
import MyContext from "../components/Context";
import { useSelector } from "react-redux";
import AddToWishlist from "../helpers/AddToWishList";
import RemoveFromWishlist from "../helpers/RemoveFromWishlist";

const serverUrl = "http://localhost:5000";

const Products = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedDiscount, setSelectedDiscount] = useState("");
  const {
    fetchCartCount,
    fetchWishlistItems,
    wishlistItems,
    setWishlistItems,
  } = useContext(MyContext);
  const user = useSelector((state) => state.auth.user);
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await GetProductByCategory(category);
        let fetchedProducts = response.products;

        if (sortBy === "asc") {
          fetchedProducts = fetchedProducts.sort(
            (a, b) => a.discountedPrice - b.discountedPrice
          );
        } else if (sortBy === "dsc") {
          fetchedProducts = fetchedProducts.sort(
            (a, b) => b.discountedPrice - a.discountedPrice
          );
        }
        setFilteredProducts(
          fetchedProducts
            .filter((product) =>
              selectedBrand ? product.brand === selectedBrand : true
            )
            .filter((product) =>
              selectedDiscount
                ? product.discount >= parseInt(selectedDiscount)
                : true
            )
        );
        setProducts(fetchedProducts);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, [category, sortBy, selectedBrand, selectedDiscount]);

  const discounts = ["10%", "20%", "30%", "40%", "50%", "60%", "70%", "80%"];

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = async (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    if (user) {
      const response = await AddToCart(e, id);
      fetchCartCount();
      if (response && response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } else {
      toast.info("Please Login to Continue");
    }
  };

  const isProductInWishlist = (productId) => {
    return wishlistItems.find((item) => item.productId._id === productId);
  };

  const handleAddToWishlist = async (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    if (user) {
      if (isProductInWishlist(id)) {
        const response = await RemoveFromWishlist(id);
        if (response && response.success) {
          const updatedWishlist = wishlistItems.filter(
            (item) => item.productId._id !== id
          );
          setWishlistItems(updatedWishlist);
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
      } else {
        const response = await AddToWishlist(id);
        if (response && response.success) {
          setWishlistItems([...wishlistItems, { productId: { _id: id } }]);
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
      }
      fetchWishlistItems();
    } else {
      toast.info("Please Login to Continue");
    }
  };

  const handleOnChangeSort = (e) => {
    setSortBy(e.target.value);
  };

  const handleBrandClick = (brand) => {
    setSelectedBrand((prevBrand) => (prevBrand === brand ? "" : brand));
  };

  const handleDiscountClick = (discount) => {
    setSelectedDiscount((prevDiscount) =>
      prevDiscount === discount ? "" : discount
    );
  };

  const uniqueBrands = [...new Set(products.map((product) => product.brand))];

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.main}>
      <CategoryNames />
      <div className={styles.container}>
        <div className={styles.filterContainer}>
          <div className={styles.sortby}>Sort by</div>
          <div className={styles.input}>
            <input
              type="radio"
              name="sortBy"
              checked={sortBy === "asc"}
              onChange={handleOnChangeSort}
              value={"asc"}
            />
            <label>Price - Low to High</label>
          </div>
          <div className={styles.input}>
            <input
              type="radio"
              name="sortBy"
              checked={sortBy === "dsc"}
              onChange={handleOnChangeSort}
              value={"dsc"}
            />
            <label>Price - High to Low</label>
          </div>
          <div className={styles.brandContainer}>Brands</div>
          <div>
            {uniqueBrands.map((brand) => (
              <p
                key={brand}
                onClick={() => handleBrandClick(brand)}
                className={
                  selectedBrand === brand ? styles.selectedBrand : styles.brands
                }
              >
                {brand}
              </p>
            ))}
          </div>
          <div className={styles.brandContainer}>Discount</div>
          <div>
            {discounts.map((discount) => (
              <div
                key={discount}
                onClick={() => handleDiscountClick(discount)}
                className={
                  selectedDiscount === discount
                    ? styles.selectedDiscount
                    : styles.discounts
                }
              >
                {discount} Off or more
              </div>
            ))}
          </div>
        </div>
        <div className={styles.wapper}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Link
                to={`/products/details/${product._id}`}
                className={styles.productContainer}
                key={product._id}
              >
                <div className={styles.imgContainer}>
                  <img
                    src={`${serverUrl}/uploads/${product.image}`}
                    alt={product.name}
                    className={styles.img}
                  />
                  <button
                    className={styles.wishlistButton}
                    onClick={(e) => handleAddToWishlist(e, product._id)}
                  >
                    {isProductInWishlist(product._id) ? (
                      <>
                        <FaHeart className={styles.heartIcon} />
                        Remove
                      </>
                    ) : (
                      <>
                        <FaRegHeart className={styles.heartIcon} />
                        Wishlist
                      </>
                    )}
                  </button>
                </div>
                <div className={styles.detailsContainer}>
                  <p className={styles.name}>{product.name}</p>
                  <p className={styles.brand}>{product.brand}</p>
                  <p
                    className={`${styles.stock} ${
                      product.stock < 5 ? styles.lowStock : ""
                    }`}
                  >
                    {product.stock < 5
                      ? `Only ${product.stock} left Hurry up!`
                      : `${product.stock} Available`}
                  </p>
                  <p className={styles.price}>
                    {formatPrice(product.discountedPrice)}
                    <span className={styles.originalPrice}>
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className={styles.discount}>
                      ({product.discount}% OFF)
                    </span>
                  </p>
                  <button
                    className={styles.btn}
                    onClick={(e) => handleAddToCart(e, product._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))
          ) : (
            <p className={styles.noProducts}>No products found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
