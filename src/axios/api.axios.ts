import axios from "axios";
import Cookies from "js-cookie";

const getToken = () => {
  return Cookies.get("access_token");
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 3000,
  // headers:{
  // 	'Authorization':`BEARER ${getToken()}`
  // }
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    console.log("api config", config);
    // Get your token (from localStorage, cookie, or any other method)
    const token = getToken();

    if (token) {
      config.headers["Authorization"] = `BEARER ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle the error
    return Promise.reject(error);
  }
);

export default api;
