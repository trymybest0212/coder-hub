const Router = require("koa-router");

const {
    login
} = require("../controller/auth.controller");
const {
    verifyLogin,
    verifyAuth
} = require("../middleware/auth.middleware");

const authRouter = new Router();
const success = (ctx,next) => {
    ctx.body = '授权成功'
}
authRouter.post("/login", verifyLogin, login);
authRouter.post("/test", verifyAuth, success);

module.exports = authRouter;
