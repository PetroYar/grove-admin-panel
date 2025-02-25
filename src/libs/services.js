import axios from "axios";

const URL = "http://localhost:5000/api";


const getToken = () => {
  return localStorage.getItem("token") ?? "";
};


const API = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
  },
});


export const getData = async (params) => {
  const token = getToken();
  try {
    const response = await API.get(params, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const postData = async (params, body) => {
  const token = getToken();
  try {
    const response = await API.post(params, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
