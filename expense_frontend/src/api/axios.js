// Axios is a promise based HTTP client for node.js and browser
// In other words it is a tool to talk to your backend

import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

// Attach token to every request
api.interceptors.request.use((config) => {
  const tokens = localStorage.getItem("authTokens");

  if (tokens) {
    const parsedTokens = JSON.parse(tokens);
    config.headers.Authorization = `Bearer ${parsedTokens.access}`;
    // This is called centralized authentication handling 
    // Initially we were adding headers = Authorization for every get, post, etc request
  }

  return config;
});

export default api;
