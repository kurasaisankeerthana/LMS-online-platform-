import React, { useEffect, useState } from "react";
import { getCourses } from "../services/api";

function Home() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCourses()
      .then(data => setCourses(data.slice(0,3)))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-4">

      <h1>Welcome to LMS</h1>
      <p>Learn programming with the best online courses.</p>

      <div className="row">
        {courses.map(course => (
          <div className="col-md-4" key={course.id}>

            <div className="card mb-4">

              <img
                src={course.thumbnail}
                className="card-img-top"
                alt={course.title}
                style={{ height:"200px", objectFit:"cover" }}
              />

              <div className="card-body">

                <h5>{course.title}</h5>
                <p>Instructor: {course.instructor}</p>

                <a
                  href={course.youtubeLink}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-success"
                >
                  Watch Video
                </a>

              </div>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

export default Home;