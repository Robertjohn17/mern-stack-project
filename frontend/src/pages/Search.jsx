import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styles from "../styles/Search.module.css";
import Loading from "../components/Loading";
import VerticalProducts from "../components/VerticalProducts";

const serverUrl = "http://localhost:5000";

const SearchPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    if (searchQuery) {
      const fetchSearchResults = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`${serverUrl}/api/products/search`, {
            params: { query: searchQuery },
          });
          setProducts(response.data);
        } catch (error) {
          console.error("Error fetching search results:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchSearchResults();
    }
  }, [searchQuery]);

  if (loading) return <Loading />;

  return (
    <div className={styles.main}>
      <p className={styles.p}>Search Results for "{searchQuery}"</p>
      <p className={styles.p}>{products.length} Products found</p>
      <div className={styles.container}>
        <VerticalProducts loading={loading} data={products} />
      </div>
    </div>
  );
};

export default SearchPage;
