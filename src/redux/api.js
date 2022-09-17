import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("response")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("response")).token
    }`;
  }
  return req;
});
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

//user
export const userRegister = (user) => API.post("/user/register", user);
export const userLogin = (user) => API.post("/user/login", user);
