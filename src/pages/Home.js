import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/courses?search=${search}`);
  };

  return (
    <div className="container-fluid bg-primary text-white min-vh-100 d-flex flex-column justify-content-center">

      <div className="container">

        <div className="alert alert-light text-center mb-4">
          <h4>"Education is the passport to the future."</h4>
          <p>
            Our Learning Management System helps students learn new skills,
            track their progress, and achieve their career goals through
            high-quality online courses.
          </p>
        </div>

        <div className="text-center mb-4">
          <h1>Welcome to LMS</h1>
          <p>Learn programming with the best online courses.</p>
        </div>

        <form className="d-flex justify-content-center mb-4" onSubmit={handleSearch}>
          <input
            type="text"
            className="form-control w-50 me-2"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-warning">Search</button>
        </form>

      </div>

    </div>
  );
}

export default Home;