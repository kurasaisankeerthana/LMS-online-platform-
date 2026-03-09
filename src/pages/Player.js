import React from "react";

function Player() {
  return (
    <div className="container mt-4">

      <h2>Course Video</h2>

      <div className="ratio ratio-16x9">

        <iframe
          src="https://www.youtube.com/embed/dGcsHMXbSOA"
          title="Course Video"
          allowFullScreen
        ></iframe>

      </div>

    </div>
  );
}

export default Player;