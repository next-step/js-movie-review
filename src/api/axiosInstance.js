import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.TMDB_API_BASE_URL,
  timeout: 5000,
  headers: {
    Authorization: `Bearer ${process.env.TMDB_API_ACCESS_TOKEN}`,
    Accept: "application/json",
  },
});
