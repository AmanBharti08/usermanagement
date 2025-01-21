import React, { useEffect, useState } from "react";
import axios from "axios";

//external imports
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { CiLink } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import { IoMdCloseCircleOutline } from "react-icons/io";

//internal imports
import Style from "./UsersTable.module.css";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [filteredUser, setFilteredUser] = useState([]);
  const [searched, setSearched] = useState("");

  const [addUserModal, setAddUserModal] = useState(false);

  // form inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");

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

  // add user function
  function addUser() {
    setAddUserModal(true);
  }
  function handleAddUser(e) {
    e.preventDefault();

    if (!firstName || !lastName || !email || !company || !website) {
      alert("Please fill in all fields.");
      return;
    }

    // Create a new user object
    const newUser = {
      id: users.length + 1, // Generate a unique ID
      name: `${firstName} ${lastName}`,
      email: email,
      company: { name: company },
      website: website,
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setFilteredUser(updatedUsers);

    setFirstName("");
    setLastName("");
    setEmail("");
    setCompany("");
    setWebsite("");

    // Close the modal
    setAddUserModal(false);
  }
  // delete User
  function deleteUser(id) {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    // Update filteredUser state to ensure consistency
    setFilteredUser(updatedUsers);
  }

  return (
    <div>
      {/* Search Bar */}
      <div className={Style.searchBar}>
        <input
          type="text"
          placeholder="Search candidate by name or email"
          value={searched}
          onChange={(e) => setSearched(e.target.value)}
        />
        <div className={Style.layout}></div>
      </div>
      {/* User Table*/}
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
                        style={{
                          fontSize: "20px",
                          color: "red",
                          cursor: "pointer",
                        }}
                        onClick={() => deleteUser(user.id)}
                      />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Add Button plus more features */}
      <div className={Style.menu}>
        <div className={Style.adduser} onClick={addUser}>
          <IoMdAdd style={{ fontSize: "30px" }} />
          <p>Add User</p>
        </div>
      </div>
      {/* modal for adding user */}
      {addUserModal && (
        <div className={Style.modal}>
          <div className={Style.modalBackground}></div>
          <div className={Style.addUsermodal}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h1>Add User</h1>
              <button
                style={{
                  border: "none",
                  backgroundColor: "white",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setAddUserModal(false);
                }}
              >
                <IoMdCloseCircleOutline />
              </button>
            </div>
            {/* form */}
            <form action="" className={Style.addUserForm}>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Company"
                value={company}
                onChange={(e) => {
                  setCompany(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Website"
                value={website}
                onChange={(e) => {
                  setWebsite(e.target.value);
                }}
              />
              <button style={{ cursor: "pointer" }} onClick={handleAddUser}>
                Add
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersTable;
