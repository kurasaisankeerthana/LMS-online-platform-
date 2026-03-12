import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    alert("Logged out successfully");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">

        <Link className="navbar-brand" to="/">LMS</Link>

        <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="navbar-nav ms-auto">
              <Link className="nav-link" to="/">Home</Link>
              <Link className="nav-link" to="/courses">Courses</Link>
              <Link className="nav-link" to="/mycourses">MyCourses</Link>

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
  );
}

export default Navbar;