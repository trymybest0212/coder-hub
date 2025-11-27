const {
    create,
    reply,
    update,
    remove
} = require('../services/comment.service')

class momentController {
    async commentCreate(ctx, next) {
        const {
            id
        } = ctx.user;
        const {
            content,
        } = ctx.request.body
        const {
            momentId
        } = ctx.params
        await create(id, momentId, content)
        ctx.body = '评论成功'
    }
    async commentReply(ctx, next) {
        const {
            id
        } = ctx.user;
        const {
            content,

            commentId
        } = ctx.request.body;
        const {
            momentId
        } = ctx.params
        await reply(id, momentId, content, commentId)
        ctx.body = '评论成功'
    }
    async commentUpdate(ctx, next) {
        const {
            commentId
        } = ctx.params;
        const {
            content
        } = ctx.request.body
        await update(content, commentId)
        ctx.body = '更新成功'
    }
    async commentRemove(ctx, next) {
        const {
            commentId
        } = ctx.params;
        await remove(commentId)
        ctx.body = '删除成功'
    }
}

module.exports = new momentController();