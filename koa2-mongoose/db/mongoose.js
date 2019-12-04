const mongoose = require('mongoose')
// const User = require('../models/user')

//连接数据库
const mong = mongoose.connect("mongodb://127.0.0.1:27017/test", { useNewUrlParser: true, useUnifiedTopology: true }, (err, suc) => {
  if (err) return;
  console.log("连接成功")
})

module.exports = mong;

//以下代码测试数据库创建数据查询数据
// const users = new User({
//   name: "whp",
//   email: "dfsd",
//   password: 'dfds'
// })

// users.save().then(res => {
// })

// User.find().then(res => {
//   console.log(res);
// })