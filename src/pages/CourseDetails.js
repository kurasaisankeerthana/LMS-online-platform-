import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../services/api";

function CourseDetails() {

  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    axios.get(`/courses/${id}`)
      .then(res => setCourse(res.data))
      .catch(err => console.error("Error loading course:", err));
  }, [id]);

  if (!course) return <h3>Loading...</h3>;

  return (
    <div className="container mt-4">

      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <p>Instructor: {course.instructor}</p>
      <p>Price: ₹{course.price}</p>

      <Link to={`/player/${course.id}`} className="btn btn-primary">
        Watch Course
      </Link>

    </div>
  );
}

export default CourseDetails;