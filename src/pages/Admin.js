import { useEffect, useState } from "react";
import { getEnrollments, updateEnrollmentProgress, deleteEnrollment, addEnrollment } from "../services/api";

function Admin() {
  const [enrollments, setEnrollments] = useState([]);
  const [editing, setEditing] = useState(null); // holds id of editing row
  const [formData, setFormData] = useState({
    studentName: "",
    courseId: "",
    courseTitle: "",
    progress: 0,
    assessmentScore: 0
  });

  useEffect(() => {
    loadEnrollments();
  }, []);

  const loadEnrollments = async () => {
    const data = await getEnrollments();
    setEnrollments(data);
  };

  const handleEdit = (enroll) => {
    setEditing(enroll._id);
    setFormData(enroll);
  };

  const handleDelete = async (id) => {
    await deleteEnrollment(id);
    loadEnrollments();
  };

  const handleSave = async () => {
    await updateEnrollmentProgress(editing, formData);
    setEditing(null);
    loadEnrollments();
  };

  const handleAdd = async () => {
    await addEnrollment(formData);
    setFormData({ studentName: "", courseId: "", courseTitle: "", progress: 0, assessmentScore: 0 });
    loadEnrollments();
  };

  return (
    <div className="container mt-4">
      <h2>Admin: Manage Student Progress</h2>

      <div className="card mb-4 p-3">
        <h5>Add New Enrollment</h5>
        <div className="row g-2">
          <div className="col"><input type="text" className="form-control" placeholder="Student Name" value={formData.studentName} onChange={e => setFormData({...formData, studentName: e.target.value})} /></div>
          <div className="col"><input type="text" className="form-control" placeholder="Course ID" value={formData.courseId} onChange={e => setFormData({...formData, courseId: e.target.value})} /></div>
          <div className="col"><input type="text" className="form-control" placeholder="Course Title" value={formData.courseTitle} onChange={e => setFormData({...formData, courseTitle: e.target.value})} /></div>
          <div className="col"><input type="number" className="form-control" placeholder="Progress %" value={formData.progress} onChange={e => setFormData({...formData, progress: e.target.value})} /></div>
          <div className="col"><input type="number" className="form-control" placeholder="Assessment Score" value={formData.assessmentScore} onChange={e => setFormData({...formData, assessmentScore: e.target.value})} /></div>
          <div className="col">
            <button className="btn btn-primary" onClick={handleAdd}>Add</button>
          </div>
        </div>
      </div>

      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Student</th>
            <th>Course</th>
            <th>Progress %</th>
            <th>Assessment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {enrollments.map(enroll => (
            <tr key={enroll._id}>
              <td>{enroll.studentName}</td>
              <td>{enroll.courseTitle}</td>
              <td>
                {editing === enroll._id ? 
                  <input type="number" value={formData.progress} onChange={e => setFormData({...formData, progress: e.target.value})} /> :
                  <div className="progress">
                    <div className="progress-bar" role="progressbar" style={{width: `${enroll.progress}%`}}>{enroll.progress}%</div>
                  </div>
                }
              </td>
              <td>
                {editing === enroll._id ? 
                  <input type="number" value={formData.assessmentScore} onChange={e => setFormData({...formData, assessmentScore: e.target.value})} /> :
                  enroll.assessmentScore
                }
              </td>
              <td>
                {editing === enroll._id ? 
                  <button className="btn btn-success btn-sm me-2" onClick={handleSave}>Save</button> :
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(enroll)}>Edit</button>
                }
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(enroll._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;