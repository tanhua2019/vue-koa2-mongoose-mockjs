const Koa = require("koa");
const app = new Koa();
const bodyparser = require("koa-bodyparser");

const users = require("./routes/users");
require("./db/mongoose");

app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"]
  })
);

app.use(users.routes(), users.allowedMethods());

app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
