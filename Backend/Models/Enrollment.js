const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
  studentName: String,
  courseId: String,
  courseTitle: String,
  progress: { type: Number, default: 0 },
  assessmentScore: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("Enrollment", enrollmentSchema);
