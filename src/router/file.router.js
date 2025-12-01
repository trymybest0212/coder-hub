const Router = require("koa-router");

const {
    verifyAuth
} = require('../middleware/auth.middleware')
const avatarHandle = require('../middleware/file.middleware')
const {
    savaAvatar
} = require('../controller/file.controller')
const uploadRouter = new Router({
    prefix: "/upload"
});

uploadRouter.post("/avatar", verifyAuth, avatarHandle, savaAvatar);


module.exports = uploadRouter;