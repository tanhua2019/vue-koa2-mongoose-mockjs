import axios from "axios";
import { Loading, Message } from "element-ui";

let loading;
const startLoading = () => {
  loading = Loading.service({
    lock: true,
    text: "拼命加载中...",
    background: "rgba(0,0,0,0.7)"
  });
};

const endLoading = () => {
  loading.close();
};

//axios配置
const server = axios.create({
  baseURL: "/api",
  timeout: 5000
});

// 添加请求拦截器
server.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    startLoading();
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
server.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    endLoading();
    return response;
  },
  function(error) {
    // 对响应错误做点什么
    Message.error(error.response.data);
    return Promise.reject(error);
  }
);

export default server;
