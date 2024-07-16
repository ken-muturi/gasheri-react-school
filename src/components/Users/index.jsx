import React, { useState, useEffect } from "react";
import UserForm from "./UserForm";
import User from "./User";
import App from "../../App";
const apiUrL = "http://localhost:3000/api";

const blankUser = {
  email: "",
  firstname: "",
  othernames: "",
  password: "",
  confirmPassword: "",
};

const Index = () => {
  const [users, setUsers] = useState([]);

  const [currentUser, setCurrentUser] = useState(null);
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`${apiUrL}/users`).then((res) => res.json());
      setUsers(data);
    };

    fetchData();
  }, []);

  const handleDelete = (id) => {
    fetch(`${apiUrL}/users/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((d) => {
        setUsers(users.filter((d) => d.id !== id));
        setSuccess("Success deleting user");
      })
      .catch((e) => {
        setErrors("Error deleting user" + e);
      });
  };

  return (
    <App>
      <div className="pagetitle">
        <h1>Blank Page</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Home</a>
            </li>
            <li className="breadcrumb-item">Pages</li>
            <li className="breadcrumb-item active">Blank</li>
          </ol>
        </nav>
      </div>
      <section className="section">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Users</h5>
            {success && (
              <div
                className="alert alert-success bg-success text-light border-0 alert-dismissible fade show"
                role="alert"
              >
                Success saving users
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
              </div>
            )}

            {errors && (
              <div
                className="alert alert-danger bg-danger text-light border-0 alert-dismissible fade show"
                role="alert"
              >
                Error saving user
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
              </div>
            )}

            <table className="table table-hover  table-striped table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Firstname</th>
                  <th scope="col">Othernames</th>
                  <th scope="col">Email</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => {
                  return (
                    <User
                      key={index}
                      id={++index}
                      user={user}
                      setCurrentUser={setCurrentUser}
                      handleDelete={handleDelete}
                    />
                  );
                })}
              </tbody>
            </table>
            <p>
              <a
                href="#"
                className="btn btn-sm btn-primary"
                onClick={() => {
                  setCurrentUser(blankUser);
                }}
              >
                Add User
              </a>
            </p>
            {currentUser && (
              <UserForm
                user={currentUser}
                setUsers={setUsers}
                setSuccess={setSuccess}
                setCurrentUser={setCurrentUser}
              />
            )}
          </div>
        </div>
      </section>
    </App>
  );
};

export default Index;
