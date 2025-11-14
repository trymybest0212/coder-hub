const Router = require("koa-router");

const { createUser } = require("../controller/user.controller");
const {verifyUser} = require('../middleware/user.middleware')

const userRouter = new Router({ prefix: "/users" });

userRouter.post("/",verifyUser, createUser);

module.exports = userRouter;
