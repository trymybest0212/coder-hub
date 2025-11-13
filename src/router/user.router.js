const Router = require("koa-router");

const { createUser } = require("../controller/user.controller");

const userRouter = new Router({ prefix: "/users" });

userRouter.post("/", createUser);

module.exports = userRouter;
