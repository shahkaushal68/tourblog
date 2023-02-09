import axios from "axios";

const base_url = process.env.REACT_APP_BASE_URL;

export const login = async (userData) => {
  const response = await axios.post(`${base_url}/auth/login`, userData);
  return response.data;
};
