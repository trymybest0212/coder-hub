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
    removeMoment,
    addMomentLabel,
    getFileInfo
} = require('../controller/moment.controller')
const {verifyLabel} = require('../middleware/label.middleware')

const momentRouter = new Router({
    prefix: "/moment"
});

momentRouter.post("/", verifyAuth, create);
momentRouter.get("/:momentId",momentDetail);
momentRouter.get('/',momentList);
momentRouter.patch("/:momentId",verifyAuth,verifyPermission('moments'),momentUpdate)
momentRouter.delete("/:momentId",verifyAuth,verifyPermission('moments'),removeMoment)

momentRouter.post('/:momentId/labels',verifyAuth,verifyPermission('moments'),verifyLabel,addMomentLabel)

momentRouter.get('/images/:filename', getFileInfo)

module.exports = momentRouter;