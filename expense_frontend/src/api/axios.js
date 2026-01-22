// Axios is a promise based HTTP client for node.js and browser
// In other words it is a tool to talk to your backend

import axios from "axios";

const api = axios.create({
    baseURL:"http://127.0.0.1:8000/",
});

export default api;
