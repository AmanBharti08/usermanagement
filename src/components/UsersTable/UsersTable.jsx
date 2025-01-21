import React, { useEffect, useState } from "react";
import axios from "axios";

//external imports
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { CiLink } from "react-icons/ci";

//internal imports
import Style from "./UsersTable.module.css";

const UsersTable = () => {
  // api call test
  const [users, setUsers] = useState([]);
  const [filteredUser, setFilteredUser] = useState([]);
  const [searched, setSearched] = useState("");

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (searched === "") {
      setFilteredUser(users); // If no search term, we will show all users
    } else {
      const filtered = users.filter(
        (user) =>
          user.name.toLowerCase().includes(searched.toLowerCase()) ||
          user.email.toLowerCase().includes(searched.toLowerCase())
      );
      setFilteredUser(filtered);
    }
  }, [searched, users]);
  return (
    <div>
      <div className={Style.searchBar}>
        <input
          type="text"
          placeholder="Search candidate by name"
          value={searched}
          onChange={(e) => setSearched(e.target.value)}
        />
      </div>
      <div className={Style.usersList}>
        {/* using table tag will be useful here i assume */}
        <table className={Style.userstable}>
          <thead className={Style.theadStyle}>
            <tr>
              <th
                style={{ display: "flex", gap: "10px", alignItems: "center" }}
              >
                <button
                  type="checkbox"
                  style={{ width: "15px", height: "15px" }}
                ></button>
                Name
              </th>
              <th>Email</th>
              <th>Company</th>
              <th>Website</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUser.map((user) => {
              console.log(user.website);
              return (
                <tr key={user.name}>
                  <td
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <button
                      type="checkbox"
                      style={{ width: "15px", height: "15px" }}
                    ></button>
                    {user.name}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.company.name}</td>
                  <td>
                    <button style={{ border: "none" }}>
                      <a
                        href={user.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <CiLink />
                      </a>
                    </button>
                  </td>
                  <td
                    style={{
                      display: "flex",
                      gap: "20px",
                      alignItems: "center",
                    }}
                  >
                    <button style={{ border: "none" }}>
                      <FaRegEdit style={{ fontSize: "15px", color: "blue" }} />
                    </button>
                    <button style={{ border: "none" }}>
                      <MdDeleteOutline
                        style={{ fontSize: "20px", color: "red" }}
                      />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
