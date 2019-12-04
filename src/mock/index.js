import Mock from "mockjs";
// import { mockLogin } from "./api";
import { data } from "./data";

Mock.setup({
  timeout: "300-600"
});

// Mock.mock(/\/api\/login/, "post", mockLogin);
Mock.mock(/\/users\/login/, "post", data);

export default Mock;
