const Router = require("koa-router");

const { createUser,getAvatarInfo } = require("../controller/user.controller");
const {verifyUser,handlePassword} = require('../middleware/user.middleware')

const userRouter = new Router({ prefix: "/users" });

userRouter.post("/",verifyUser,handlePassword, createUser);
userRouter.get('/:userId/avatar',getAvatarInfo)

module.exports = userRouter;
