const {
    exitsLabel,
    create,
    exitsLabelInMoment
} = require('../services/label.service')
const verifyLabel = async (ctx, next) => {
    const {
        labels
    } = ctx.request.body;
    const {
        momentId
    } = ctx.params
    const newLabels = [];
    for (let label of labels) {
        // 是否存在
        const queryRes = await exitsLabel(label);
        if (!queryRes) {
            // 添加标签
            const createRes = await create(label)
            newLabels.push({
                name: label,
                id: createRes.insertId
            })
        } else {
            // 是否在动态上存在
            const queryInMomentRes = await exitsLabelInMoment(momentId, queryRes.id)
            if (!queryInMomentRes) {
                newLabels.push({
                    name: label,
                    id: queryRes.id
                })
            }
        }
    }
    ctx.newLabels = newLabels;
    await next()
}
module.exports = {
    verifyLabel
}