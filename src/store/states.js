const state = {
  count: 0,
  clientName: localStorage.getItem("clientName")
    ? localStorage.getItem("clientName")
    : "",
  clientToken: localStorage.getItem("clientToken")
    ? localStorage.getItem("clientToken")
    : null
};

export default state;
