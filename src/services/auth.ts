/* eslint-disable */
import axios from "axios";
const BASE_URL = "https://reqres.in/api";

export const login = async (email: string, password: string) => {
  console.log(email, password);
  try {
    const response = await axios.post(`${BASE_URL}/login`, { email, password });
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
export const register = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, {
      email,
      password,
    });
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
