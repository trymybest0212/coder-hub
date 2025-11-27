const Router = require("koa-router");

const {
    verifyAuth,
    verifyPermission
} = require('../middleware/auth.middleware')
const {
    create,
    momentDetail,
    momentList,
    momentUpdate,
    removeMoment
} = require('../controller/moment.controller')

const momentRouter = new Router({
    prefix: "/moment"
});

momentRouter.post("/", verifyAuth, create);
momentRouter.get("/:momentId",momentDetail);
momentRouter.get('/',momentList);
momentRouter.patch("/:momentId",verifyAuth,verifyPermission('moments'),momentUpdate)
momentRouter.delete("/:momentId",verifyAuth,verifyPermission('moments'),removeMoment)

module.exports = momentRouter;