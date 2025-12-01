const connection = require("../app/database");

class FileService {
    async createAvatar(filename, size, mimeType, user_id) {
        const statement = `INSERT INTO avatar (filename,size,mimeType,user_id) VALUES (?,?,?,?)`
        try {
            const [result] = await connection.execute(statement, [filename, size, mimeType, user_id]);
            return result
        } catch (error) {
            console.log(error, '添加头像失败');
        }
    }
    async getAvatarService(user_id) {
        const statement = `SELECT * FROM avatar av WHERE av.user_id = ?`
        try {
            const [result] = await connection.execute(statement, [user_id]);
            return result[0]
        } catch (error) {
            console.log(error, '获取头像失败');
        }
    }
}

module.exports = new FileService()