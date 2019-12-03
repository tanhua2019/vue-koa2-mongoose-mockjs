import request from "../config/axios";

export function userLogin(data) {
  return request({
    url: "/api/login",
    method: "post",
    data: data
  });
}
