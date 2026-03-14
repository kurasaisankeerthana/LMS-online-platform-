const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  id: String,
  title: String,
  instructor: String,
  price: Number,
  thumbnail: String,
  videoUrl: String,
  duration: String,
  lessons: [String],
}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);
