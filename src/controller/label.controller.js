const {
    create,
    list
} = require('../services/label.service')

class LabelController {
    async createLabel(ctx, next) {
        const {
            name
        } = ctx.request.body
        await create(name)
        ctx.body = "标签创建成功";
    }
    async labelList(ctx, next) {
        const {
            limit,
            offset
        } = ctx.query
      const result =  await list(limit, offset)
      ctx.body = result
    }
}

module.exports = new LabelController();