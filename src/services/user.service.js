const connection = require("../app/database");

class UserService {
	async createUserService(user = {}) {
		const { name, password } = user;
		const statement = `INSERT INTO users (name,password) VALUES (?, ?)`;
        const result = await connection.execute(statement, [name, password]);
        console.log(result,'111');

	}
	async getUserByName(name) {
		const statement = `SELECT * from users WHERE name = ?`;
		const result = await connection.execute(statement, [name]);
		return result;
	}
}

module.exports = new UserService();
