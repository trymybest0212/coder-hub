
const connection = require("../app/database");
class AuthService {
    async checkAuth(tableName,momentId, userId) {
     const statement = `SELECT * FROM ${tableName} WHERE id = ? AND user_id = ?`
        try {
            const [result] = await connection.execute(statement, [momentId,userId]);
            return result?.length === 0 ? false: true
        } catch (error) {
            console.log(error, '权限校验失败');
        }
    }
}

module.exports = new AuthService()