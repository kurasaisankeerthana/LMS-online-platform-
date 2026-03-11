// services/api.js
import axios from "axios";

const BASE_URL = "http://localhost:3001"; // or wherever your backend runs

export const getCourses = async () => {
  const res = await axios.get(`${BASE_URL}/courses`);
  return res.data;
};

export const getEnrollments = async () => {
  const res = await axios.get(`${BASE_URL}/enrollments`);
  return res.data;
};

export const addEnrollment = async (enrollment) => {
  const res = await axios.post(`${BASE_URL}/enrollments`, enrollment);
  return res.data;
};

export const updateEnrollmentProgress = async (id, progress) => {
  const res = await axios.patch(`${BASE_URL}/enrollments/${id}`, { progress });
  return res.data;
};

export const deleteEnrollment = async (id) => {
  const res = await axios.delete(`${BASE_URL}/enrollments/${id}`);
  return res.data;
};