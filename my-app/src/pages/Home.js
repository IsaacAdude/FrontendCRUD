import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import "./Home.css";

export default function Home() {
  const [users, setUsers] = useState([]);
  const { id } = useParams();

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

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/users/${id}`);
      loadUsers();
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  

  return (
    <div 
      className="container mt-5 home-container"
      style={{ 
        backgroundImage: `url('https://up.yimg.com/ib/th?id=OIP.GJOP6aMAGYuHOLrm7wK3CAHaE8&pid=Api&rs=1&c=1&qlt=95&w=145&h=97')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        padding: "20px"
      }}
    >
      <h2>Welcome to La Voie</h2>
      <p>Explore our curated database of unique campsites and reserve your spot today!</p>

      <div className="py-4">
        <table className="table table-bordered shadow">
          <thead>
            <tr>
              <th scope="col">S.N</th>
              <th scope="col">Name</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <Link className="btn btn-info mx-2" to={`/viewuser/${user.id}`}>
                    View
                  </Link>
                  <Link className="btn btn-outline-primary mx-2" to={`/edituser/${user.id}`}>
                    Edit
                  </Link>
                  <button className="btn btn-danger mx-2" onClick={() => deleteUser(user.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
