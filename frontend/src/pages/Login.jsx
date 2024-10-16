import React, { useState, useContext } from "react";
import styles from "../styles/Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { login } from "../redux/authSlice";
import MyContext from "../components/Context";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const { fetchCartCount } = useContext(MyContext);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(login(formData));
    if (response.error) {
      toast.error(response.payload.message);
    } else {
      if (response.payload.isAdmin) {
        toast.success("Admin Login Successful");
        navigate("/admin-panel");
      } else {
        toast.success("Login Successful");
        fetchCartCount();
        navigate("/");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.mains}>
        <form onSubmit={handleSubmit} className={styles.main}>
          <h2>LOGIN</h2>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span onClick={() => setShowPassword((preve) => !preve)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button type="submit" className={styles.btn} disabled={loading}>
            Login
          </button>
          <div className={styles.text}>
            New Member?
            <Link className={styles.link} to="/register">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
