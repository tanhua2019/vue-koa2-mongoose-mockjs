import axios from "axios";

//axios配置
const server = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000
});

export default server;
