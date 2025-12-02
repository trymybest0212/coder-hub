const Router = require("koa-router");

const {
    verifyAuth
} = require('../middleware/auth.middleware')
const {avatarHandle,pictureHandle,pictureReSize} = require('../middleware/file.middleware')
const {
    savaAvatar,
    savaPicture
} = require('../controller/file.controller')
const uploadRouter = new Router({
    prefix: "/upload"
});

uploadRouter.post("/avatar", verifyAuth, avatarHandle, savaAvatar);
uploadRouter.post("/picture",verifyAuth,pictureHandle,pictureReSize,savaPicture)


module.exports = uploadRouter;