const connection = require("../app/database");

class LabelService {
    async create(name) {
        const statement = `INSERT INTO LABELS (name) VALUES (?)  `
        try {
            const [result] = await connection.execute(statement, [name]);
            return result
        } catch (error) {
            console.log(error, '新增标签失败');
        }
    }
    async list(limit, offset) {
        const statement = `SELECT * FROM labels LIMIT ?, ? `
        try {
            const [result] = await connection.execute(statement, [offset, limit]);
            return result
        } catch (error) {
            console.log(error, '新增标签失败');
        }
    }
    async exitsLabel(name) {
        const statement = `SELECT * FROM labels WHERE name = ?`
        try {
            const [result] = await connection.execute(statement, [name]);
            return result[0]
        } catch (error) {
            console.log(error, '查询标签是否存在失败');
        }
    }
    async exitsLabelInMoment(momentId, id) {
        const statement = `SELECT * FROM moment_labels WHERE moment_id = ? AND label_id = ? `
        try {
            const [result] = await connection.execute(statement, [momentId, id]);
            return result[0]
        } catch (error) {
            console.log(error, '查询标签是否在动态上失败');
        }
    }

}

module.exports = new LabelService()