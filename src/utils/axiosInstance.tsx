import axios from 'axios';

// Get token from local storage
const authToken = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')!).token : null;

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASEURL,
  withCredentials: true,
  timeout: 5000,
  headers: {
    Authorization: `Bearer ${authToken}`,
  },
});

export default axiosInstance;
