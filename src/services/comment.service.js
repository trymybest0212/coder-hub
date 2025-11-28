const connection = require("../app/database");

class CommentService {
    async create(userId, momentId, content) {
        const statement = `INSERT INTO comments (user_id,moment_id,content) VALUES(?,?,?)`
        try {
            const [result] = await connection.execute(statement, [userId, momentId, content]);
            return result
        } catch (error) {
            console.log(error, '创建评论失败');
        }
    }
    async reply(userId, momentId, content, commentId) {
        const statement = `INSERT INTO comments (user_id,moment_id,comment_id,content) VALUES(?,?,?,?)`
        try {
            const [result] = await connection.execute(statement, [userId, momentId, commentId, content]);
            return result
        } catch (error) {
            console.log(error, '回复评论失败');
        }
    }
    async update(content, id) {
        const statement = `UPDATE comments SET content = ? WHERE id = ?`
        try {
            const [result] = await connection.execute(statement, [content, id]);
            return result
        } catch (error) {
            console.log(error, '修改评论失败');
        }
    }
    async remove(momentId) {
        const statement = `DELETE FROM comments WHERE id = ?`
        try {
            const [result] = await connection.execute(statement, [momentId]);
            return result
        } catch (error) {
            console.log(error, '删除评论失败');
        }
    }
    async list(limit, offset, momentId) {
        const statement = `SELECT c.id, c.content, c.updateAt updateTime, c.createAt createTime,
          JSON_OBJECT('id',u.id,'name',u.name) user
          FROM comments c 
          LEFT JOIN users u ON u.id = c.user_id
          WHERE  c.moment_id = ?  LIMIT ? , ?`
        try {
            const [result] = await connection.execute(statement, [momentId, offset, limit]);
            return result
        } catch (error) {
            console.log(error, '获取评论列表失败');
        }
    }
}

module.exports = new CommentService();