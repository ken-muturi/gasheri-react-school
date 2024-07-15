import React from "react";
import { decrypt } from "../../utils/util";

const Index = () => {
  const session = decrypt(sessionStorage.getItem("auth"));
  const auth = JSON.parse(session || "{}");

  const handleLogout = (event) => {
    sessionStorage.removeItem("loggedIn");
    sessionStorage.removeItem("auth");
    sessionStorage.clear();
    window.location.href = "/students";
  };

  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <div className="d-flex align-items-center justify-content-between">
        <a href="index.html" className="logo d-flex align-items-center">
          <img src="assets/img/logo.png" alt="" />
          <span className="d-none d-lg-block">NiceAdmin</span>
        </a>
        <i className="bi bi-list toggle-sidebar-btn"></i>
      </div>

      <div className="search-bar">
        <form
          className="search-form d-flex align-items-center"
          method="POST"
          action="#"
        >
          <input
            type="text"
            name="query"
            placeholder="Search"
            title="Enter search keyword"
          />
          <button type="submit" title="Search">
            <i className="bi bi-search"></i>
          </button>
        </form>
      </div>

      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          <li className="nav-item d-block d-lg-none">
            <a className="nav-link nav-icon search-bar-toggle " href="#">
              <i className="bi bi-search"></i>
            </a>
          </li>

          <li className="nav-item pe-3">
            <a
              className="nav-link nav-profile d-flex align-items-center pe-0"
              href="#"
            >
              <img
                src="assets/img/profile-img.jpg"
                alt="Profile"
                className="rounded-circle"
              />
              <span className="d-none d-md-block dropdown-toggle ps-2">
                {auth.firstname} {auth.lastname}
              </span>
            </a>
          </li>
          <li className="nav-item pe-3">
            <a className="nav-link" href="#" onClick={handleLogout}>
              Logout
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Index;
