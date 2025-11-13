const { createUserService } = require("../services/user.service");

class UserController {
	async createUser(ctx, next) {
		const result = await createUserService(ctx.request?.body);
		// ctx.body(result);
	}
}

module.exports = new UserController();
