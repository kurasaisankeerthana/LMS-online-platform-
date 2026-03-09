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
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">

        <Link className="navbar-brand" to="/">LMS</Link>

        <div className="navbar-nav ms-auto">

          <Link className="nav-link" to="/">Home</Link>

          <Link className="nav-link" to="/courses">Courses</Link>

          {!user && (
            <>
              <Link className="nav-link" to="/login">Login</Link>
              <Link className="nav-link" to="/signup">Signup</Link>
            </>
          )}

          {user && (
            <button
              className="btn btn-danger ms-2"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;