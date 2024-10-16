import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import styles from "../styles/EditProfile.module.css";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { setUser } from "../redux/authSlice";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";

const serverUrl = "http://localhost:5000";

const EditProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    email: "",
    address: "",
    phoneNumber: "",
    profileImage: null,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        fullname: user.fullname || "",
        email: user.email || "",
        address: user.address || "",
        phoneNumber: user.phoneNumber || "",
        profileImage: null,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    if (e.target.name === "profileImage") {
      setFormData({ ...formData, profileImage: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get("token");

      const formDataUpload = new FormData();
      formDataUpload.append("fullname", formData.fullname);
      formDataUpload.append("address", formData.address);
      formDataUpload.append("phoneNumber", formData.phoneNumber);
      formDataUpload.append("profileImage", formData.profileImage);
      formDataUpload.append("username", formData.username);
      formDataUpload.append("email", formData.email);

      console.log(formData.profileImage);

      const response = await axios.put(
        `${serverUrl}/api/user/editprofile`,
        formDataUpload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const dataApi = response.data.updatedUser;
      dispatch(setUser(dataApi));
      //   console.log("Profile Updated", dataApi);
      toast.success("Profile Updated Successfull");
      setFormData({
        ...formData,
        profileImage: null,
      });
      e.target.reset();
    } catch (error) {
      toast.error("Error updating profile:", error);
    }
  };

  if (!user) {
    return <Loading />;
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h3>Edit Profile</h3>
        {user.profileImage ? (
          <img
            src={`${serverUrl}/uploads/${user.profileImage}`}
            alt="Profile"
            className={styles.profilePicture}
          />
        ) : (
          <FaUser className={styles.icon} />
        )}
        <label className={styles.input}>
          Username:
          <input
            className={styles.labels}
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>
        <label className={styles.input}>
          Full Name:
          <input
            className={styles.labels}
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
          />
        </label>
        <label className={styles.input}>
          Email:
          <input
            className={styles.labels}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label className={styles.input}>
          Address:
          <input
            className={styles.labels}
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </label>
        <label className={styles.input}>
          Phone Number:
          <input
            className={styles.labels}
            type="number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          Profile Picture:
          <input
            className={styles.labels}
            type="file"
            accept="image/*"
            name="profileImage"
            onChange={handleChange}
          />
        </label>
        <button type="submit" className={styles.btn}>
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
