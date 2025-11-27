const connection = require("../app/database");

class UserService {
    async createMomentService(userId, content) {
        const statement = `INSERT INTO MOMENTS (user_id,content) VALUES(?,?)`
        try {
            const [result] = await connection.execute(statement, [userId, content]);
            return result
        } catch (error) {
            console.log(error, '动态插入失败');
        }
    }
    async getDetailById(momentId) {
        const statement = `SELECT m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,JSON_OBJECT('id',u.id
,'name',u.name) user FROM moments m  LEFT JOIN users u ON m.user_id  = u.id WHERE m.id = ?`;
        try {
            const [result] = await connection.execute(statement, [momentId]);
            return result[0]
        } catch (error) {
            console.log(error, '获取详情失败');
        }
    }
    async getMomentList(offset, limit) {
        const statement = `SELECT m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,JSON_OBJECT('id',u.id
,'name',u.name) user FROM moments m  LEFT JOIN users u ON m.user_id  = u.id LIMIT ? , ?`;
        try {
            const [result] = await connection.execute(statement, [offset, limit]);
            return result
        } catch (error) {
            console.log(error, '获取列表失败');
        }
    }
    async update(content,id) {
        const statement = `UPDATE moments SET content = ? WHERE id = ?`
         try {
            const [result] = await connection.execute(statement, [content, id]);
            return result
        } catch (error) {
            console.log(error, '修改评论失败');
        }
    }
}

module.exports = new UserService();