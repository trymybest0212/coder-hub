const connection = require("../app/database");

class UserService {
	async createUserService(user = {}) {
		try {
			const {
				name,
				password
			} = user;
			const statement = `INSERT INTO users (name,password) VALUES (?, ?)`;
			await connection.execute(statement, [name, password]);
		} catch (error) {
			console.log(error, '注册用户失败');
		}
	}
	async getUserByName(name) {
		const statement = `SELECT * from users WHERE name = ?`;
		try {
			const result = await connection.execute(statement, [name]);
			return result;
		} catch (error) {
			console.log(error, 'getUserByName失败');
		}
	}
	async updateUserAvatar(id,url) {
		const statement = `UPDATE users SET avatar_url = ? WHERE id = ?`;
		try {
			const result = await connection.execute(statement, [url,id]);
			return result;
		} catch (error) {
			console.log(error, '更新头像失败');
		}
	}
}

module.exports = new UserService();