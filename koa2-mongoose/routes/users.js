/* eslint-disable require-atomic-updates */
const router = require("koa-router")();
const bcrypt = require("bcryptjs");
const grvatar = require("gravatar");
const jwt = require("jsonwebtoken");

router.prefix("/api/users");
const User = require("../models/user");

router.get("/", async ctx => {
  const aaa = await User.find();
  ctx.body = aaa;
});

router.post("/register", async ctx => {
  console.log(ctx.request.body, "77");
  const findResult = await User.find({ name: ctx.request.body.name });
  if (findResult.length > 0) {
    ctx.body = {
      code: 500,
      message: "用户名已存在"
    };
  } else {
    const hashPwd = bcrypt.hashSync(
      ctx.request.body.password,
      bcrypt.genSaltSync(10)
    );
    const avatar = grvatar.url(ctx.request.body.email, {
      s: "200",
      r: "pg",
      d: "mm"
    });
    const newUser = new User({
      name: ctx.request.body.name,
      email: ctx.request.body.email,
      password: hashPwd,
      avatar
    });
    await newUser.save();
    ctx.body = newUser;
  }
});

router.post("/login", async ctx => {
  console.log(ctx.request.body.name);
  const name = ctx.request.body.name;
  const findResult = await User.find({ name: name });
  if (findResult.length == 0) {
    ctx.body = {
      code: 500,
      message: "用户名不存在"
    };
  } else {
    //查到后验证密码
    var result = await bcrypt.compareSync(
      ctx.request.body.password,
      findResult[0].password
    );
    if (result) {
      const token = jwt.sign(name, "wang");
      ctx.body = {
        code: 200,
        token: "Bearer " + token,
        message: findResult
      };
    } else {
      ctx.body = {
        code: 500,
        message: "密码错误"
      };
    }
  }
});

module.exports = router;
