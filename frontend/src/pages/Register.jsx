import React, { useState } from "react";
import styles from "../styles/Register.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const serverUrl = "http://localhost:5000";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    isAdmin: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const { username, email, password, isAdmin } = formData;
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${serverUrl}/api/user/register`,
        formData
      );
      if (isAdmin) {
        toast.success("Admin account created successfully!");
      } else {
        toast.success(response.data.message);
      }
      navigate("/login");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.mains}>
        <form onSubmit={handleSubmit} className={styles.main}>
          <h2>SIGN UP</h2>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              type="email"
              placeholder="Email"
              name="email"
              value={email}
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
              value={password}
              onChange={handleChange}
              required
            />
            <span onClick={() => setShowPassword((preve) => !preve)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {/* <div className={styles.checkboxContainer}>
            <label>
              <input
                type="checkbox"
                name="isAdmin"
                checked={isAdmin}
                onChange={handleChange}
              />
              Register as Admin
            </label>
          </div> */}
          <button type="submit" className={styles.btn}>
            Create Account
          </button>
          <div className={styles.text}>
            Already a member?
            <Link className={styles.link} to="/login">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
