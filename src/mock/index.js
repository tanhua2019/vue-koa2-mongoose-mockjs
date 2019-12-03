import Mock from "mockjs";
import { mockLogin } from "./api";
// import dataApi from "./data";

Mock.setup({
  timeout: "300-600"
});

Mock.mock(/\/api\/login/, "post", mockLogin);
// Mock.mock(/\/api\/login/, "post", dataApi.data);

export default Mock;
