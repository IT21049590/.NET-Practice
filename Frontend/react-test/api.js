import axios from "axios";

const API_BASE_URL = "http://localhost:5001/api";

export default axios.create({
  baseURL: API_BASE_URL,
});
