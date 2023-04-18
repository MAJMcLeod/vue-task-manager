import axios from "axios";
import store from "../store";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 15000,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  // Get access token from store and pass it through request headers of axios instance
  async (config) => {
    const token = await store.getters["auth/getAccessToken"];
    config.headers.Authorization = token;
    return config;
  },
  (error) => {
    // If something fails return a promise rejection
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  async (res) => {
    //If the headers contain an access token save it
    if (res.headers["access-token"]) {
      console.log("new access token from headers");
      //Store in Vuex
      store.commit("auth/setAccessToken", res.headers["access-token"]);
    }
    return res;
  },
  async (err) => {
    const config = err.config;
    let retry = false;
    if (config.url !== "/login" && err.response) {
      if (err.response.status === 401 && !retry) {
        retry = true;
        config._retry;
        try {
          console.log("Ok")
          const res = await axiosInstance.get("/revalidate-login");
          store.commit("auth/setAccessToken", res.headers["access-token"]);
          return axiosInstance(config);
        } catch (error) {
          console.log(error);
          return Promise.reject(error);
        }
      }
    }
  }
);

export default axiosInstance;
