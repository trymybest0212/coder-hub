const connection = require("../app/database");

class UserService {
	async createUserService(user = {}) {
		const { name, password } = user;
		const statement = `INSERT INTO users (name,password) VALUES (?, ?)`;
		let result;
		try {
			result = await connection.execute(statement, [(name, password)]);
		} catch (error) {
			console.log(error, "111");
		}

		return result;
	}
}

module.exports = new UserService();
