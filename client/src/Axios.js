import axios from "axios";

const instance = axios.create({
  baseURL: "/",
});
const token = `Bearer ${localStorage.getItem("token")}`;
instance.defaults.headers.common["Authorization"] = token;

export default instance;
