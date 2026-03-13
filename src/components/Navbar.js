import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    alert("Logged out successfully");
    navigate("/");
    window.location.reload();
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" onClick={closeMenu}>LMS</Link>

          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse d-none d-lg-flex">
            <div className="navbar-nav ms-auto">
              <Link className="nav-link" to="/">Home</Link>
              <Link className="nav-link" to="/courses">Courses</Link>
              <Link className="nav-link" to="/mycourses">MyCourses</Link>
              <Link className="nav-link" to="/admin">Admin</Link>
              <Link className="nav-link" to="/course-management">Manage Courses</Link>

              {user && (
                <button
                  className="btn btn-outline-danger ms-2"
                  onClick={handleLogout}
                >
                  Logout ({user.name})
                </button>
              )}

              {!user && (
                <>
                  <Link className="nav-link" to="/login">Login</Link>
                  <Link className="nav-link" to="/signup">Signup</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div 
        className={`mobile-overlay ${isOpen ? 'active' : ''}`} 
        onClick={closeMenu}
      ></div>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${isOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <h4>LMS Menu</h4>
          <button className="close-btn" onClick={closeMenu}>&times;</button>
        </div>
        <div className="drawer-body">
          <Link className="drawer-link" to="/" onClick={closeMenu}>
            <i className="bi bi-house-door"></i> Home
          </Link>
          <Link className="drawer-link" to="/courses" onClick={closeMenu}>
            <i className="bi bi-book"></i> Courses
          </Link>
          <Link className="drawer-link" to="/mycourses" onClick={closeMenu}>
            <i className="bi bi-journal-check"></i> MyCourses
          </Link>
          <Link className="drawer-link" to="/admin" onClick={closeMenu}>
            <i className="bi bi-gear"></i> Admin
          </Link>
          <Link className="drawer-link" to="/course-management" onClick={closeMenu}>
            <i className="bi bi-pencil-square"></i> Manage Courses
          </Link>

          <hr className="drawer-divider" />

          {user && (
            <>
              <div className="drawer-user">
                <i className="bi bi-person-circle"></i> {user.name}
              </div>
              <button
                className="btn btn-danger w-100 mt-2"
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }}
              >
                Logout
              </button>
            </>
          )}

          {!user && (
            <>
              <Link className="drawer-link" to="/login" onClick={closeMenu}>
                <i className="bi bi-box-arrow-in-right"></i> Login
              </Link>
              <Link className="drawer-link" to="/signup" onClick={closeMenu}>
                <i className="bi bi-person-plus"></i> Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;