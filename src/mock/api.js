const userInfo = {
  admin: {
    name: "whp",
    age: 20,
    token: "Love"
  }
};

export const mockLogin = config => {
  const { userName } = JSON.parse(config.body);
  return userInfo[userName];
};
