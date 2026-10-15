import axios from "axios";

const apiBaseUrl =
  import.meta.env.VITE_API_URL?.trim() || "";

const apiClient = axios.create({
  baseURL:apiBaseUrl,

  headers: {
    "Content-Type": "application/json",
  },

  timeout: 15000,
});


apiClient.interceptors.response.use(
  (response) => response,

  (error) => {
    console.error(
      "API Error:",
      error.response?.data || error.message
    );

    return Promise.reject(error);
  }
);


export default apiClient;