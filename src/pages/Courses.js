import { useState, useEffect } from "react";
import { getCourses } from "../services/api";
import { Card, Button } from "react-bootstrap";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [enrolled, setEnrolled] = useState([]);

  useEffect(() => {
    getCourses()
      .then((data) => setCourses(data))
      .catch((err) => console.error(err));
  }, []);

  const handleEnroll = (id) => {
    if (!enrolled.includes(id)) {
      setEnrolled([...enrolled, id]);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">All Courses</h2>

      <div className="row">
        {courses.map((course) => (
          <div className="col-md-4 mb-4" key={course.id}>
            <Card className="shadow-sm">

              {/* COURSE IMAGE */}
              <Card.Img
                variant="top"
                src={course.thumbnail}
                alt={course.title}
                style={{ height: "200px", objectFit: "cover" }}
              />

              <Card.Body>

                <Card.Title>{course.title}</Card.Title>

                <Card.Text>
                  Instructor: {course.instructor}
                </Card.Text>

                {/* ENROLL BUTTON */}
                <Button
                  variant="primary"
                  className="me-2"
                  onClick={() => handleEnroll(course.id)}
                  disabled={enrolled.includes(course.id)}
                >
                  {enrolled.includes(course.id) ? "Enrolled" : "Enroll"}
                </Button>

                {/* VIEW VIDEO BUTTON */}
                <Button
                  variant="success"
                  href={course.youtubeLink}
                  target="_blank"
                >
                  View Course
                </Button>

              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;