import Vue from "vue";
import Vuex from "vuex";
import state from "./states";
import mutations from "./mutations";

Vue.use(Vuex);

const getters = {
  gettersAdd(state) {
    return state.count + 100;
  }
};

const actions = {
  actionsAdd({ commit }, n) {
    return commit("mutationsAdd", n);
  },
  actionsReduce({ commit }, n) {
    return commit("mutationsReduce", n);
  }
};

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
});
