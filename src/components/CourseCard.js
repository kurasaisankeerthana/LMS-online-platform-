import React from "react";

function CourseCard({ course, onEnroll }) {

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow">

        {/* Course Thumbnail */}
        <img
          src={course.thumbnail}
          className="card-img-top"
          alt={course.title}
          style={{ height: "180px", objectFit: "cover" }}
        />

        <div className="card-body">

          {/* Course Title */}
          <h5 className="card-title">{course.title}</h5>

          {/* Description */}
          <p className="card-text">{course.description}</p>

          {/* Course Details */}
          <p><strong>Instructor:</strong> {course.instructor}</p>
          <p><strong>Level:</strong> {course.level}</p>
          <p><strong>Duration:</strong> {course.duration}</p>
          <p><strong>Students:</strong> {course.students}</p>

          {/* Enroll Button */}
          <button
            className="btn btn-primary w-100"
            onClick={() => onEnroll(course)}
          >
            Enroll
          </button>

        </div>
      </div>
    </div>
  );
}

export default CourseCard;