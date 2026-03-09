import React from "react";

function CourseDetails() {
  return (
    <div className="container mt-4">

      <h2>Course Details</h2>

      <p><strong>Course:</strong> React Development</p>
      <p><strong>Instructor:</strong> John</p>
      <p><strong>Description:</strong> Learn React from beginner to advanced.</p>
     

      <button className="btn btn-primary">
        Start Learning
      </button>

    </div>
  );
}

export default CourseDetails;