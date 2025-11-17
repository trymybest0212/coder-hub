const Router = require("koa-router");

const { createUser } = require("../controller/user.controller");
const {verifyUser,hanlePassword} = require('../middleware/user.middleware')

const userRouter = new Router({ prefix: "/users" });

userRouter.post("/",verifyUser,hanlePassword, createUser);

module.exports = userRouter;
