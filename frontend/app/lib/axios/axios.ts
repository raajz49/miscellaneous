import axios from "axios";

const api = axios.create({
  baseURL: "/api", // goes through Next rewrite → Rust
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

// Optional: global response error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
