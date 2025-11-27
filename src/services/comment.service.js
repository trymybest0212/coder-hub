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
            console.log(error, '修改动态失败');
        }
    }
    async remove(momentId) {
        const statement = `DELETE FROM comments WHERE id = ?`
        try {
            const [result] = await connection.execute(statement, [momentId]);
            return result
        } catch (error) {
            console.log(error, '删除动态失败');
        }
    }
}

module.exports = new CommentService();