import axios from "axios";

// Reads VITE_API_URL from the .env file
// In dev:  http://localhost:5001/api/notes
// In prod: https://your-backend.vercel.app/api/notes  (just change the .env)

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api/notes" : "/api/notes";

const api = axios.create({
    baseURL: BASE_URL,
});

export default api;
