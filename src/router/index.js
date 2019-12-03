import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("@/pages/Login")
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/pages/Home")
  },
  {
    path: "*",
    component: () => import("@/pages/Error")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
