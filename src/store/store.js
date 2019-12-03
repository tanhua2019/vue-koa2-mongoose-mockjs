import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

const state = {
  count: 0
};

const getters = {
  gettersAdd(state) {
    return state.count + 100;
  }
}

const mutations = {
  mutationsAdd(state, n) {
    return (state.count += n);
  },
  mutationsReduce(state, n) {
    return (state.count -= n);
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
  actions,
  getters
});
