import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Fetch users from the backend
  const loadUsers = async () => {
    try {
      const result = await axios.get("http://localhost:8080/api/users");
      setUsers(result.data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Function to delete a user
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/users/${id}`);
      loadUsers(); // Refresh the user list
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Registered Users</h2>

      {users.length > 0 ? (
        <div>
          {users.map((user) => (
            <div key={user.id} className="card mt-3 p-4">
              <h5>{user.name}</h5>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>

              <div className="btn-group mt-2">
                {/* View Button */}
                <button
                  onClick={() => navigate(`/viewuser/${user.id}`)}
                  className="btn btn-info btn-sm"
                >
                  View
                </button>

                {/* Edit Button */}
                <button
                  onClick={() => navigate(`/edituser/${user.id}`)}
                  className="btn btn-warning btn-sm mx-2"
                >
                  Edit
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => deleteUser(user.id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default UserList;
