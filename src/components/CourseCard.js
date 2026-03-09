import { useState } from "react";

function CourseCard({ course }) {
  const [enrolled, setEnrolled] = useState(false);

  const handleEnroll = () => {
    setEnrolled(true);
  };

  return (
    <div>
     
      <img
        src={course.thumbnail || "https://via.placeholder.com/400x200?text=Course+Thumbnail"}
        alt={course.title}
        className="card-img-top mb-2"
        style={{ height: "200px", objectFit: "cover", borderRadius: "4px" }}
      />

      {/* Course Details */}
      <p><b>Category:</b> {course.category}</p>
      <p><b>Level:</b> {course.level}</p>

      {course.lessons && (
        <div>
          <b>Lessons:</b>
          <ul>
            {course.lessons.map((lesson, idx) => (
              <li key={idx}>{lesson}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Watch Course Button */}
      {course.youtubeLink && (
        <a
          href={course.youtubeLink}
          target="_blank"
          rel="noreferrer"
          className="btn btn-primary btn-sm mt-2 me-2"
        >
          Watch Course
        </a>
      )}

      {/* Enroll Button */}
      <button
        className={`btn btn-sm mt-2 ${enrolled ? "btn-success" : "btn-outline-success"}`}
        onClick={handleEnroll}
        disabled={enrolled}
      >
        {enrolled ? "Enrolled" : "Enroll"}
      </button>
    </div>
  );
}

export default CourseCard;