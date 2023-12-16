import React, { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const isAuthenticated = localStorage.getItem("token") !== null;
  const [collapsed, setCollapsed] = useState(true);

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Personal Accountant
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={handleToggleCollapse}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse${collapsed ? "" : " show"}`}
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>

              {!isAuthenticated && (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              )}

              {isAuthenticated && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/add">
                      Add
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/reports">
                      Reports
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/pl">
                      P&L
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/charts">
                      Charts
                    </Link>
                  </li>
                </>
              )}
            </ul>
            {isAuthenticated && (
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/logout"
                    onClick={handleLogout}
                  >
                    Logout
                  </Link>
                </li>
                <li className="nav-item">
                  <span className="navbar-text">Welcome, {name}</span>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
