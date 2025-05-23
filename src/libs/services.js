import axios from "axios";


const URL = "https://grove-server-one.vercel.app/api";
// const URL =
//   "http://localhost:5000/api" ;

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
export const updateData = async (params, body) => {
  const token = getToken();
  try {
    const response = await API.put(params, body);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
export const deleteData = async (params) => {
  const token = getToken();
  try {
    const response = await API.delete(params, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
};

export const postDataWithFile = async (url, data, method = "POST") => {
  const token = getToken();
  const formData = new FormData();

  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      if (key === "seo") {
      
        formData.append(key, JSON.stringify(data[key]));
      } else if (data[key] instanceof File) {
        formData.append(key, data[key]);
      } else {
        formData.append(key, data[key]);
      }
    }
  }

  try {
    const response = await API({
      method,
      url,
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};
