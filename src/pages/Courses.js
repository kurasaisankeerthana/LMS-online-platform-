import { useEffect, useState } from "react";
import { getCourses, getEnrollments, addEnrollment } from "../services/api";
import { Link, useLocation } from "react-router-dom";

function Courses() {

  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);

  const location = useLocation();

  // get search query from URL
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search")?.toLowerCase() || "";

  useEffect(() => {
    loadCourses();
  }, []);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const courseData = await getCourses();
      const enrollmentData = await getEnrollments();

      setCourses(courseData || []);
      setEnrollments(enrollmentData || []);
    } catch (err) {
      console.error("Error loading courses:", err);
      setError("Failed to load courses. Please check if the server is running.");
    } finally {
      setLoading(false);
    }
  };

  /* ---------- ENROLL COURSE ---------- */

  const handleEnroll = async (course) => {

    const alreadyEnrolled = enrollments.find(
      (e) => String(e.courseId) === String(course.id)
    );

    if (alreadyEnrolled) {
      alert("You are already enrolled in this course!");
      return;
    }

    const newEnrollment = {
      courseId: course.id,
      courseTitle: course.title,
      studentName: "Current User",
      progress: 0,
      assessmentScore: 0
    };

    await addEnrollment(newEnrollment);

    alert(`Enrolled in ${course.title} successfully!`);

    loadCourses();
  };

  /* ---------- FILTER COURSES ---------- */

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery)
  );

  return (

    <div className="container-fluid py-5 bg-dark bg-gradient" style={{ minHeight: "100vh" }}>

      <div className="container">

        <h2 className="mb-5 text-center text-white fw-bold">
           Explore Our Courses
        </h2>

        {loading && (
          <div className="text-center py-5">
            <div className="loading mx-auto mb-3"></div>
            <p className="text-white">Loading courses...</p>
          </div>
        )}

        {error && (
          <div className="alert alert-danger text-center py-5">
            {error}
            <button className="btn btn-warning mt-3" onClick={loadCourses}>
              Retry
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className="row">
            {filteredCourses.length === 0 ? (
              <div className="col-12">
                <p className="text-white text-center fs-5">
                  No courses found.
                </p>
              </div>
            ) : (
              filteredCourses.map(course => {
                const enrolled = enrollments.find(
                  (e) => String(e.courseId) === String(course.id)
                );

                return (
                  <div className="col-md-4 mb-4" key={course.id}>
                    <div className="card h-100 shadow-lg border-0">
                      <img
                        src={course.thumbnail}
                        className="card-img-top"
                        alt={course.title}
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title fw-bold">{course.title}</h5>
                        <p><strong>Instructor:</strong> {course.instructor}</p>
                        <p><strong>Duration:</strong> {course.duration}</p>
                        <p><strong>Price:</strong> ₹{course.price}</p>
                        {enrolled && (
                          <span className="badge bg-success mb-2 me-2">
                            Enrolled
                          </span>
                        )}
                        <div className="d-flex gap-2 mt-3">
                          {enrolled ? (
                            <Link
                              to={`/player/${course.id}`}
                              className="btn btn-success flex-fill"
                            >
                              Watch
                            </Link>
                          ) : (
                            <button
                              className="btn btn-secondary flex-fill"
                              onClick={() => alert("Please enroll in this course to watch the video")}
                            >
                              Watch
                            </button>
                          )}
                          {!enrolled && (
                            <button
                              className="btn btn-primary flex-fill"
                              onClick={() => handleEnroll(course)}
                            >
                              Enroll
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

      </div>

    </div>

  );
}

export default Courses;