const Router = require("koa-router");

const {
    verifyAuth
} = require('../middleware/auth.middleware')
const {
    create,
    momentDetail,
    momentList
} = require('../controller/moment.controller')

const momentRouter = new Router({
    prefix: "/moment"
});

momentRouter.post("/", verifyAuth, create);
momentRouter.get("/:momentId",momentDetail);
momentRouter.get('/',momentList)

module.exports = momentRouter;