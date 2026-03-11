import { useEffect, useState } from "react";
import { 
  getCourses, 
  getEnrollments, 
  addEnrollment,
  updateEnrollmentProgress,
  deleteEnrollment
} from "../services/api";
import { Link } from "react-router-dom";

function MyCourses() {

  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);

  /* ---------------- READ ---------------- */

  useEffect(() => {
    getCourses().then(data => setCourses(data || []));
  }, []);

  useEffect(() => {
    const fetchEnrollments = async () => {
      const data = await getEnrollments();
      setEnrollments(data || []);
    };

    fetchEnrollments();
    const interval = setInterval(fetchEnrollments, 2000);

    return () => clearInterval(interval);
  }, []);

  /* ---------------- CREATE ---------------- */

  const enrollCourse = async (courseId) => {

    const newEnrollment = {
      courseId,
      progress: 0,
      completedLessons: 0
    };

    await addEnrollment(newEnrollment);
    alert("Course Enrolled Successfully");
  };

  /* ---------------- UPDATE ---------------- */

  const updateProgress = async (enrollmentId, progress) => {

    await updateEnrollmentProgress(enrollmentId, progress);
    alert("Progress Updated");
  };

  /* ---------------- DELETE ---------------- */

  const removeEnrollment = async (enrollmentId) => {

    await deleteEnrollment(enrollmentId);
    alert("Course Removed");
  };

  /* ---------------- FILTER COURSES ---------------- */

  const enrolledCourses = courses.filter(course =>
    enrollments.some(e => e.courseId === course.id)
  );

  const getProgressColor = (progress) => {
    if (progress >= 100) return "bg-success";
    if (progress >= 50) return "bg-info";
    return "bg-warning";
  };

  return (

    <div
      className="container-fluid py-5"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#43cea2,#185a9d)"
      }}
    >

      <div className="container">

        <h2 className="mb-5 text-center text-white fw-bold display-5">
          🎓 My Enrolled Courses
        </h2>

        <div className="row">

          {enrolledCourses.length === 0 && (
            <p className="text-white text-center fs-5">
              No courses enrolled yet.
            </p>
          )}

          {enrolledCourses.map(course => {

            const enrollment = enrollments.find(e => e.courseId === course.id);

            const totalLessons = course.lessons?.length || 1;

            const completedLessons =
              enrollment?.completedLessons ??
              Math.round((enrollment?.progress || 0) * totalLessons / 100);

            const progress = Math.round(
              (completedLessons / totalLessons) * 100
            );

            return (

              <div className="col-lg-4 col-md-6 mb-4" key={course.id}>

                <div className="card border-0 shadow-lg h-100">

                  <img
                    src={course.thumbnail}
                    className="card-img-top"
                    alt={course.title}
                    style={{ height: "200px", objectFit: "cover" }}
                  />

                  <div className="card-body">

                    <h5 className="card-title fw-bold">
                      {course.title}
                    </h5>

                    <p><strong>Instructor:</strong> {course.instructor}</p>
                    <p><strong>Duration:</strong> {course.duration}</p>
                    <p><strong>Price:</strong> ₹{course.price}</p>

                    <span className="badge bg-success mb-3">
                      Enrolled
                    </span>

                    {/* Progress Bar */}

                    <div className="mb-3">

                      <div className="progress shadow-sm" style={{ height: "25px" }}>

                        <div
                          className={`progress-bar progress-bar-striped progress-bar-animated ${getProgressColor(progress)}`}
                          style={{ width: `${progress}%` }}
                        >
                          {progress}% Completed
                        </div>

                      </div>

                    </div>

                    {/* UPDATE PROGRESS */}

                    <button
                      className="btn btn-info w-100 mb-2"
                      onClick={() => updateProgress(enrollment.id, progress + 10)}
                    >
                      Update Progress
                    </button>

                    {/* DELETE ENROLLMENT */}

                    <button
                      className="btn btn-danger w-100 mb-2"
                      onClick={() => removeEnrollment(enrollment.id)}
                    >
                      Unenroll Course
                    </button>

                    <Link
                      to={`/player/${course.id}`}
                      className="btn btn-success w-100 fw-bold"
                    >
                      ▶ Watch Course
                    </Link>

                  </div>

                </div>

              </div>

            );

          })}

        </div>

      </div>

    </div>

  );
}

export default MyCourses;