import request from "../config/axios";

export function userLogin(data) {
  return request({
    url: "/users/login",
    method: "post",
    data: data
  });
}

export function userRegister(data) {
  return request({
    url: "/users/register",
    method: "post",
    data: data
  });
}
