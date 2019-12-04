import Mock from "mockjs";
const Random = Mock.Random;

export const data = () => {
  let arr = [];
  for (let i = 0; i < 100; i++) {
    let newArr = {
      username: Random.cname(),
      artical: Random.csentence(3, 15),
      time: Random.date() + " " + Random.time()
    };
    arr.push(newArr);
  }
  return arr;
};
