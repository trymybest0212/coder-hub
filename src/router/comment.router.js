const Router = require("koa-router");

const {
    verifyAuth,
    verifyPermission
} = require('../middleware/auth.middleware')
const {
    commentCreate,
    commentReply,
    commentUpdate,
    commentRemove,
    commentList
} = require('../controller/comment.controller')

const commentRouter = new Router({
    prefix: "/comment"
});

commentRouter.post("/:momentId", verifyAuth, commentCreate);
commentRouter.post("/:momentId/reply", verifyAuth, commentReply);
commentRouter.get("/:momentId", commentList);

commentRouter.patch("/:commentId", verifyAuth, verifyPermission('comments'), commentUpdate)
commentRouter.delete("/:commentId", verifyAuth, verifyPermission('comments'), commentRemove)

module.exports = commentRouter;