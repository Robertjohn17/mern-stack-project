import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../styles/Users.module.css";
import Cookies from "js-cookie";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import { RiDeleteBin6Line } from "react-icons/ri";
import AdminSideBar from "../../components/AdminSideBar";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const serverUrl = "http://localhost:5000";

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/user/all-users`);
      setAllUsers(response.data.filter((user) => !user.isAdmin));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = (userId) => {
    confirmAlert({
      customUI: ({ onClose }) => (
        <div className={styles.confirmAlert}>
          <h1>Confirm to Submit</h1>
          <p>Are you sure you want to delete this user?</p>
          <div className={styles.confirmAlertButtons}>
            <button
              onClick={async () => {
                try {
                  const token = Cookies.get("token");
                  await axios.delete(`${serverUrl}/api/user/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                  });
                  setAllUsers(allUsers.filter((user) => user._id !== userId));
                  toast.success("User deleted successfully");
                } catch (error) {
                  console.error("Error deleting user:", error);
                }
                onClose();
              }}
            >
              Yes
            </button>
            <button onClick={onClose}>No</button>
          </div>
        </div>
      ),
      overlayClassName: styles.confirmAlertOverlay,
    });
  };

  const handleBan = (userId) => {
    confirmAlert({
      customUI: ({ onClose }) => (
        <div className={styles.confirmAlert}>
          <h1>Confirm to Submit</h1>
          <p>Are you sure you want to ban this user?</p>
          <div className={styles.confirmAlertButtons}>
            <button
              onClick={async () => {
                try {
                  const token = Cookies.get("token");
                  await axios.put(`${serverUrl}/api/user/${userId}/ban`, null, {
                    headers: { Authorization: `Bearer ${token}` },
                  });
                  fetchAllUsers();
                  toast.success("User banned successfully");
                } catch (error) {
                  console.error("Error banning user:", error);
                }
                onClose();
              }}
            >
              Yes
            </button>
            <button onClick={onClose}>No</button>
          </div>
        </div>
      ),
      overlayClassName: styles.confirmAlertOverlay,
    });
  };

  const handleUnban = (userId) => {
    confirmAlert({
      customUI: ({ onClose }) => (
        <div className={styles.confirmAlert}>
          <h1>Confirm to Submit</h1>
          <p>Are you sure you want to unban this user?</p>
          <div className={styles.confirmAlertButtons}>
            <button
              onClick={async () => {
                try {
                  const token = Cookies.get("token");
                  await axios.put(
                    `${serverUrl}/api/user/${userId}/unban`,
                    null,
                    {
                      headers: { Authorization: `Bearer ${token}` },
                    }
                  );
                  fetchAllUsers();
                  toast.success("User unbanned successfully");
                } catch (error) {
                  console.error("Error unbanning user:", error);
                }
                onClose();
              }}
            >
              Yes
            </button>
            <button onClick={onClose}>No</button>
          </div>
        </div>
      ),
      overlayClassName: styles.confirmAlertOverlay,
    });
  };

  return (
    <div className={styles.container}>
      <AdminSideBar />
      <div className={styles.main}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>No.</th>
              <th>Username</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td className={styles.name}>{user.username}</td>
                <td>{user.email}</td>
                <td className={styles.data}>
                  {user.banned ? (
                    <button
                      className={styles.btn}
                      onClick={() => handleUnban(user._id)}
                    >
                      Unban
                    </button>
                  ) : (
                    <button
                      className={styles.btnn}
                      onClick={() => handleBan(user._id)}
                    >
                      Ban
                    </button>
                  )}
                  <button
                    className={styles.btnn}
                    onClick={() => handleDelete(user._id)}
                  >
                    <RiDeleteBin6Line />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
