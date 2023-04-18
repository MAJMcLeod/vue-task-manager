import api from "./api.js";
import store from "../store/index.js";

const attemptRelog = async () => {
  try {
    const res = await api.get("/revalidate-login");
    store.commit("auth/setAccessToken", res.headers["access-token"]);
    store.commit("auth/setUserDetails", res.data);
    return true;
  } catch (error) {
    return false;
  }
};

export { attemptRelog };
