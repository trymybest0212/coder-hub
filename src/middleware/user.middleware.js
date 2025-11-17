const {
	NAME_OR_PASSWORD_IS_REQUIRE,
	NAME_OR_PASSWORD_IS_NOT_VAILD,
	NAME_IS_NOT_UNIQUE,
} = require("../constant/error.type");
const { getUserByName } = require("../services/user.service");
const md5Password = require("../utils/handle-password");

const verifyUser = async (ctx, next) => {
	const nameReg = /^[a-zA-Z0-9]{6,12}$/;
	const passwordReg =
		/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
	const { name, password } = ctx.request.body;
	//判断账号密码格式校验
	if (!name || !password) {
		const error = new Error(NAME_OR_PASSWORD_IS_REQUIRE);
		return ctx.app.emit("error", error, ctx);
	} else if (!nameReg.test(name) || !passwordReg.test(password)) {
		const error = new Error(NAME_OR_PASSWORD_IS_NOT_VAILD);
		return ctx.app.emit("error", error, ctx);
	}
	// 判断账号唯一
	const result = (await getUserByName(name)) || [];
	if (result[0]?.length) {
		const error = new Error(NAME_IS_NOT_UNIQUE);
		return ctx.app.emit("error", error, ctx);
	}

	await next();
};

const hanlePassword = async (ctx, next) => {
	let { password } = ctx.request.body;
    ctx.request.body.password = md5Password(password);
	await next();
};

module.exports = {
	verifyUser,
	hanlePassword,
};
