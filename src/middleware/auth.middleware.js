const {
	NAME_OR_PASSWORD_IS_REQUIRE,
	USER_IS_NOT_EXIST,
	PASSWORD_IS_ERROR,
} = require("../constant/error.type");
const { getUserByName } = require("../services/user.service");
const md5Password = require("../utils/handle-password");

const verifyLogin = async (ctx, next) => {
	// 不为空
	const { name, password } = ctx.request.body;
	if (!name || !password) {
		const error = new Error(NAME_OR_PASSWORD_IS_REQUIRE);
		return ctx.app.emit("error", error, ctx);
	}
	// 是否存在
	const result = (await getUserByName(name)) || [];
	if (!result[0]?.length) {
		const error = new Error(USER_IS_NOT_EXIST);
		return ctx.app.emit("error", error, ctx);
	}
	// 密码是否正确

	if (result[0]?.[0].password !== md5Password(password)) {
		const error = new Error(PASSWORD_IS_ERROR);
		return ctx.app.emit("error", error, ctx);
	}
	ctx.user = result[0]?.[0] || {};
	await next();
};

module.exports = verifyLogin;
