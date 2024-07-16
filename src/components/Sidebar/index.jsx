import React from "react";

const Index = () => {
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <a className="nav-link collapsed" href="/users">
            <i className="bi bi-question-circle"></i>
            <span>Users</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link collapsed" href="/students">
            <i className="bi bi-question-circle"></i>
            <span>Students</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link collapsed" href="/teachers">
            <i className="bi bi-question-circle"></i>
            <span>Teachers</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link collapsed" href="/faqs">
            <i className="bi bi-question-circle"></i>
            <span>F.A.Q</span>
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Index;
