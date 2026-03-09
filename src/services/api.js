import axios from "axios";

const API_URL = "http://localhost:3001/courses";

export const getCourses = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};