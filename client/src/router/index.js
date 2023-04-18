import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import LoginPage from "../views/LoginPage.vue";
import store from "../store";
import * as AuthService from "../services/authService.js";

const routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/login",
    component: LoginPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const isUserAuthenticated = async () => {
  const accessToken = await store.getters["auth/getAccessToken"];
  return accessToken ? true : false;
};

// Basic router guarding
router.beforeEach(async (to, from, next) => {
  const authenticated = await isUserAuthenticated();
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);

  if (to.path === "/login" && !authenticated) {
    console.log("router guard: no auth token on login page");
    try {
      const relogState = await AuthService.attemptRelog();
      console.log("ass")

      if (relogState) {
        console.log("router guard: successful relog from login page");
        next("/");
      }
    } catch (error) {
      console.error("ppooopp")
    }
  }

  if (to.path === "/login" && authenticated) {
    console.log("router guard: Already logged in");
    next("/");
  }

  if (authRequired) {
    if (!authenticated) {
      console.log("router guard: No auth token");
      const relogState = await AuthService.attemptRelog();
      if (relogState) {
        console.log("router guard: successful relog");
        next();
      } else {
        console.log("router guard: failed relog");
        next("/login");
      }
    } else {
      console.log("router guard: Has auth token");
      next();
    }
  } else {
    console.log("router guard: Auth not required");
    next();
  }
});

export default router;
