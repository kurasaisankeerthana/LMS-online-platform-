import axios from "axios";

const BASE_URL = "http://localhost:5000";

// ========== COURSE APIs ==========
export const getCourses = async () => {
  const res = await axios.get(`${BASE_URL}/courses`);
  return res.data;
};

export const getCourseById = async (id) => {
  const res = await axios.get(`${BASE_URL}/courses/${id}`);
  return res.data;
};

export const addCourse = async (data) => {
  const res = await axios.post(`${BASE_URL}/courses`, data);
  return res.data;
};

export const updateCourse = async (id, data) => {
  const res = await axios.put(`${BASE_URL}/courses/${id}`, data);
  return res.data;
};

export const deleteCourse = async (id) => {
  const res = await axios.delete(`${BASE_URL}/courses/${id}`);
  return res.data;
};

// ========== ENROLLMENT APIs ==========
export const getEnrollments = async () => {
  const res = await axios.get(`${BASE_URL}/enrollments`);
  return res.data;
};

export const addEnrollment = async (data) => {
  const res = await axios.post(`${BASE_URL}/enrollments`, data);
  return res.data;
};

export const deleteEnrollment = async (id) => {
  const res = await axios.delete(`${BASE_URL}/enrollments/${id}`);
  return res.data;
};

export const updateEnrollmentProgress = async (id, data) => {
  const res = await axios.patch(`${BASE_URL}/enrollments/${id}`, data);
  return res.data;
};

// ========== AUTHENTICATION APIs ==========
export const signup = async (data) => {
  const res = await axios.post(`${BASE_URL}/api/auth/signup`, data);
  return res.data;
};

export const login = async (data) => {
  const res = await axios.post(`${BASE_URL}/api/auth/login`, data);
  return res.data;
};
