const { createUserService } = require("../services/user.service");

class UserController {
	async createUser(ctx, next) {
		await createUserService(ctx.request?.body);
		ctx.body = "新增成功";
	}
}

module.exports = new UserController();
