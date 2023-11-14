/* eslint-disable */
import axios from "axios";
const BASE_URL = "https://reqres.in/api";

export const login = async (email: string, password: string) => {
  console.log(email, password);
  try {
    const response = await axios.post(`${BASE_URL}/login`, { email, password });
    sessionStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Check if it's an AxiosError
      if (error.response && error.response.data && error.response.data.error) {
        throw new Error(error.response.data.error);
      }
    }

    // Handle the case where the error structure is not as expected
    throw new Error("An unexpected error occurred");
  }
};

export const register = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, {
      email,
      password,
    });
    sessionStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Check if it's an AxiosError
      if (error.response && error.response.data && error.response.data.error) {
        throw new Error(error.response.data.error);
      }
    }

    // Handle the case where the error structure is not as expected
    throw new Error("An unexpected error occurred");
  }
};
