export const SET_CLIENT_TOKEN = "SET_CLIENT_TOKEN";
export const SET_CLIENT_NAME = "SET_CLIENT_NAME";
export const CLIENT_LOGOUT = "CLIENT_LOGOUT";

const mutations = {
  //客户
  [SET_CLIENT_TOKEN]: (state, clientToken) => {
    state.clientToken = clientToken;
    localStorage.setItem("clientToken", clientToken);
  },
  [SET_CLIENT_NAME]: (state, name) => {
    state.clientName = name;
    localStorage.setItem("clientName", name);
  },
  [CLIENT_LOGOUT]: state => {
    state.clientToken = null;
    state.clientName = "";
    state.car = null;
    localStorage.removeItem("clientToken", "clientName");
  },
  //主页加减
  mutationsAdd(state, n) {
    return (state.count += n);
  },
  mutationsReduce(state, n) {
    return (state.count -= n);
  }
};

export default mutations;
