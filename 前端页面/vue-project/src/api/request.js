// 功能：axios实例的封装
import axios from "axios";
import { ElMessage } from "element-plus";

const service = axios.create({
  baseURL: "http://127.0.0.1:3007",
});

// 拦截器
service.interceptors.response.use(
  (response) => {
    const { status, data, statusText } = response;
    if (status == 200 || status == 201) {
      if (data.token) {
        localStorage.setItem("token", data.token);
        console.log("Token stored in localStorage:", data.token);
      }
      return data;
    } else {
      ElMessage.error(statusText);
      return Promise.reject(statusText);
    }
  },
  (error) => {
    // if (error.response && error.response.status === 401) {
    //   ElMessage.error("密码错误");
    // } else if (error.response && error.response.status === 404) {
    //   ElMessage.error("用户不存在");
    // } else if (error.response && error.response.status === 400) {
    //   ElMessage.error("用户已存在");
    // }
    return Promise.reject(error);
  }
);

function request(option) {
  option.method = option.method || "get";

  if (option.method.toLowerCase() === "get") {
    option.params = option.data;
  }
  console.log("输出option", option);
  return service(option);
}
export default request;
