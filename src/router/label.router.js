const Router = require("koa-router");

const {
    verifyAuth
} = require('../middleware/auth.middleware')
const {createLabel,labelList} = require('../controller/label.controller')
const labelRouter = new Router({
    prefix: "/label"
});

labelRouter.get("/", verifyAuth, createLabel);
labelRouter.get("/page", labelList);


module.exports = labelRouter;