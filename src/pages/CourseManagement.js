import { useEffect, useState } from "react";
import { getCourses, addCourse, updateCourse, deleteCourse } from "../services/api";

function CourseManagement() {
  const [courses, setCourses] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    instructor: "",
    price: 0,
    thumbnail: "",
    videoUrl: "",
    duration: "",
    lessons: []
  });
  const [lessonInput, setLessonInput] = useState("");

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const data = await getCourses();
    setCourses(data);
  };

  const handleEdit = (course) => {
    setEditing(course.id);
    setFormData(course);
    setShowAddForm(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      await deleteCourse(id);
      loadCourses();
    }
  };

  const handleSave = async () => {
    await updateCourse(editing, formData);
    setEditing(null);
    resetForm();
    loadCourses();
  };

  const handleAdd = async () => {
    await addCourse(formData);
    setShowAddForm(false);
    resetForm();
    loadCourses();
  };

  const resetForm = () => {
    setFormData({
      id: "",
      title: "",
      instructor: "",
      price: 0,
      thumbnail: "",
      videoUrl: "",
      duration: "",
      lessons: []
    });
    setLessonInput("");
  };

  const addLesson = () => {
    if (lessonInput.trim()) {
      setFormData({
        ...formData,
        lessons: [...formData.lessons, lessonInput.trim()]
      });
      setLessonInput("");
    }
  };

  const removeLesson = (index) => {
    setFormData({
      ...formData,
      lessons: formData.lessons.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="container mt-4">
      <h2>Course Management</h2>

      <button 
        className="btn btn-primary mb-4" 
        onClick={() => {
          setShowAddForm(!showAddForm);
          setEditing(null);
          resetForm();
        }}
      >
        {showAddForm ? "Cancel" : "Add New Course"}
      </button>

      {/* ADD COURSE FORM */}
      {showAddForm && (
        <div className="card mb-4 p-4">
          <h5>Add New Course</h5>
          <div className="row g-3">
            <div className="col-md-6">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Course ID" 
                value={formData.id} 
                onChange={e => setFormData({...formData, id: e.target.value})} 
              />
            </div>
            <div className="col-md-6">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Title" 
                value={formData.title} 
                onChange={e => setFormData({...formData, title: e.target.value})} 
              />
            </div>
            <div className="col-md-6">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Instructor" 
                value={formData.instructor} 
                onChange={e => setFormData({...formData, instructor: e.target.value})} 
              />
            </div>
            <div className="col-md-6">
              <input 
                type="number" 
                className="form-control" 
                placeholder="Price" 
                value={formData.price} 
                onChange={e => setFormData({...formData, price: e.target.value})} 
              />
            </div>
            <div className="col-md-6">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Thumbnail URL" 
                value={formData.thumbnail} 
                onChange={e => setFormData({...formData, thumbnail: e.target.value})} 
              />
            </div>
            <div className="col-md-6">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Video URL" 
                value={formData.videoUrl} 
                onChange={e => setFormData({...formData, videoUrl: e.target.value})} 
              />
            </div>
            <div className="col-md-6">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Duration (e.g., 5 hours)" 
                value={formData.duration} 
                onChange={e => setFormData({...formData, duration: e.target.value})} 
              />
            </div>
            <div className="col-md-12">
              <label className="form-label">Lessons</label>
              <div className="input-group mb-2">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Add lesson" 
                  value={lessonInput} 
                  onChange={e => setLessonInput(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && addLesson()}
                />
                <button className="btn btn-secondary" onClick={addLesson}>Add Lesson</button>
              </div>
              <ul className="list-group">
                {formData.lessons.map((lesson, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    {lesson}
                    <button className="btn btn-sm btn-danger" onClick={() => removeLesson(index)}>Remove</button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-12">
              <button className="btn btn-success" onClick={handleAdd}>Add Course</button>
            </div>
          </div>
        </div>
      )}

      {/* COURSES TABLE */}
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Instructor</th>
              <th>Price</th>
              <th>Duration</th>
              <th>Lessons</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course._id}>
                <td>
                  {editing === course.id ? 
                    <input 
                      type="text" 
                      className="form-control form-control-sm" 
                      value={formData.id} 
                      onChange={e => setFormData({...formData, id: e.target.value})} 
                    /> : 
                    course.id
                  }
                </td>
                <td>
                  {editing === course.id ? 
                    <input 
                      type="text" 
                      className="form-control form-control-sm" 
                      value={formData.title} 
                      onChange={e => setFormData({...formData, title: e.target.value})} 
                    /> : 
                    course.title
                  }
                </td>
                <td>
                  {editing === course.id ? 
                    <input 
                      type="text" 
                      className="form-control form-control-sm" 
                      value={formData.instructor} 
                      onChange={e => setFormData({...formData, instructor: e.target.value})} 
                    /> : 
                    course.instructor
                  }
                </td>
                <td>
                  {editing === course.id ? 
                    <input 
                      type="number" 
                      className="form-control form-control-sm" 
                      value={formData.price} 
                      onChange={e => setFormData({...formData, price: e.target.value})} 
                    /> : 
                    `₹${course.price}`
                  }
                </td>
                <td>
                  {editing === course.id ? 
                    <input 
                      type="text" 
                      className="form-control form-control-sm" 
                      value={formData.duration} 
                      onChange={e => setFormData({...formData, duration: e.target.value})} 
                    /> : 
                    course.duration
                  }
                </td>
                <td>{course.lessons?.length || 0}</td>
                <td>
                  {editing === course.id ? (
                    <>
                      <button className="btn btn-success btn-sm me-2" onClick={handleSave}>Save</button>
                      <button className="btn btn-secondary btn-sm" onClick={() => {
                        setEditing(null);
                        resetForm();
                      }}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(course)}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(course.id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CourseManagement;
