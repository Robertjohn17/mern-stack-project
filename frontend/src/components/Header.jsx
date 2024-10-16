import React, { useState, useContext, useEffect } from "react";
import styles from "../styles/Header.module.css";
import logo from "../assets/pogo.jpg";
import { IoSearch } from "react-icons/io5";
import { FaShoppingCart, FaHeart, FaUser } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import axios from "axios";
import { toast } from "react-toastify";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import MyContext from "./Context";

const serverUrl = "http://localhost:5000";

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [dialogOpen, setDialogOpen] = useState(false);
  const { cartCount } = useContext(MyContext);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!location.pathname.startsWith("/search")) {
      setSearch("");
    }
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await axios.post(`${serverUrl}/api/user/logout`);
      dispatch(logout());
      toast.info("Logged Out Successfully!");
      navigate("/login");
      setDialogOpen(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleLogoClick = () => {
    if (!user) {
      navigate("/");
    } else if (user.isAdmin) {
      navigate("/admin-panel");
    } else {
      navigate("/");
    }
  };

  const handleUserIconClick = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);

    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.imgContainer} onClick={handleLogoClick}>
        <img src={logo} alt="logo" className={styles.img} />
      </div>
      <div className={styles.searchContainer}>
        <div className={styles.searchBoxContainer}>
          <input
            type="text"
            name="search"
            placeholder="Search Products, Brands..."
            className={styles.inputSearch}
            onChange={handleSearch}
            value={search}
          />
        </div>
        <div className={styles.iconContainer}>
          <IoSearch className={styles.iconSearch} />
        </div>
      </div>
      <div className={styles.profileContainer}>
        {user ? (
          user.isAdmin ? (
            <>
              <div className={styles.iconWrapper} onClick={handleUserIconClick}>
                <FaUser className={styles.icon} />
                <span className={styles.adminName}>{user.username}</span>
              </div>
              <Dialog
                open={dialogOpen}
                onClose={handleCloseDialog}
                className={styles.dialog}
                aria-labelledby="admin-dialog-title"
              >
                <DialogContent>
                  <div className={styles.username}>
                    Welcome {user.username}!
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDialog} color="primary">
                    Close
                  </Button>
                  <Button onClick={handleLogout} color="secondary">
                    Logout
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          ) : (
            <>
              <div className={styles.iconWrapper}>
                <Link to="/products/cart" className={styles.iconLink}>
                  <FaShoppingCart className={styles.icon} />
                  <span className={styles.cartCount}>{cartCount.count}</span>
                </Link>
                <Link to="/products/wishlist" className={styles.iconLink}>
                  <FaHeart className={styles.heartIcon} />
                </Link>
                <div className={styles.iconLink} onClick={handleUserIconClick}>
                  {user.profileImage ? (
                    <img
                      src={`${serverUrl}/uploads/${user.profileImage}`}
                      alt="Profile"
                      className={styles.profilePicture}
                    />
                  ) : (
                    <FaUser className={styles.icon} />
                  )}
                </div>
              </div>
              <Dialog
                open={dialogOpen}
                onClose={handleCloseDialog}
                className={styles.dialog}
                aria-labelledby="user-dialog-title"
              >
                <DialogContent>
                  <div className={styles.username}>
                    Welcome {user.username}!
                  </div>
                  <Link
                    to="/editProfile"
                    className={styles.dialogLink}
                    onClick={handleCloseDialog}
                  >
                    Edit Profile
                  </Link>
                  <Link
                    to="/orders"
                    className={styles.dialogLink}
                    onClick={handleCloseDialog}
                  >
                    Orders
                  </Link>
                  <Link
                    to="/contact"
                    className={styles.dialogLink}
                    onClick={handleCloseDialog}
                  >
                    Contact
                  </Link>
                  <Link
                    to="/about"
                    className={styles.dialogLink}
                    onClick={handleCloseDialog}
                  >
                    About
                  </Link>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDialog} color="primary">
                    Close
                  </Button>
                  <Button onClick={handleLogout} color="secondary">
                    Logout
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          )
        ) : (
          <Link className={styles.login} to="/login">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
