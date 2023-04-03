import Vuex from "vuex";
import auth from "./auth";

// Create store
export default new Vuex.Store({
  modules: {
    auth,
  },
});
