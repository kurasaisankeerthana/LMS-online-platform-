// ./pages/Player.js
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCourses } from "../services/api";


function Player() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(0);

  useEffect(() => {
    const fetchCourse = async () => {
      const courses = await getCourses();
      const selected = courses.find(c => c.id === id);
      setCourse(selected);
    };
    fetchCourse();
  }, [id]);

  if (!course) return <p className="text-center mt-5">Loading course...</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">{course.title}</h2>
      <div className="row">
        {/* Video Section */}
        <div className="col-md-8 mb-4">
          <div className="ratio ratio-16x9">
            <iframe
              src={course.videoUrl}
              title={course.title}
              allowFullScreen
            ></iframe>
          </div>
          <h5 className="mt-3">Current Lesson: {course.lessons[currentLesson]}</h5>
        </div>

        {/* Playlist Section */}
        <div className="col-md-4">
          <h5>Course Playlist</h5>
          <ul className="list-group">
            {course.lessons.map((lesson, index) => (
              <li
                key={index}
                className={`list-group-item ${
                  index === currentLesson ? "active" : ""
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => setCurrentLesson(index)}
              >
                {lesson}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Player;