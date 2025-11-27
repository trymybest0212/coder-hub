const {
    createMomentService,
    getDetailById,
    getMomentList,
    update
} = require('../services/moment.service')

class momentController {
    async create(ctx, next) {
        const {
            id
        } = ctx.user;
        const {
            content
        } = ctx.request.body
        const result = await createMomentService(id, content)
        ctx.body = result
    }
    async momentDetail(ctx, next) {
        const {
            momentId
        } = ctx.params;
        const result = await getDetailById(momentId);
        ctx.body = result

    }
    async momentList(ctx, next) {
        const {
            offset,
            limit
        } = ctx.query;
        const result = await getMomentList(offset, limit)
        ctx.body = result

    }
    async momentUpdate(ctx, next) {
        const {
            momentId
        } = ctx.params;
        const {
            content
        } = ctx.request.body
        await update(content, momentId)
        ctx.body = '更新成功'
    }
}

module.exports = new momentController();