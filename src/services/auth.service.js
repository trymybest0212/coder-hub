
const connection = require("../app/database");
class AuthService {
    async checkMoment(momentId, userId) {
        const statement = `SELECT m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,JSON_OBJECT('id',u.id
,'name',u.name) user FROM moments m  LEFT JOIN users u ON m.user_id  = u.id WHERE m.id = ?`;
        try {
            const [result] = await connection.execute(statement, [momentId]);
            return result?.[0]?.user?.id  === userId
        } catch (error) {
            console.log(error, 'checkMoment失败');
        }
    }
}

module.exports = new AuthService()