const {
	NAME_OR_PASSWORD_IS_REQUIRE,
	NAME_OR_PASSWORD_IS_NOT_VAILD,
	NAME_IS_NOT_UNIQUE,
} = require("../constant/error.type");
const errorHandle = (error, ctx) => {
	let status, message;
	switch (error.message) {
		case NAME_OR_PASSWORD_IS_REQUIRE:
			status = 400;
			message = "账号或密码不能为空";
			break;
		case NAME_OR_PASSWORD_IS_NOT_VAILD:
			status = 400;
			message = "账号或密码格式错误";
			break;
		case NAME_IS_NOT_UNIQUE:
			status = 409;
			message = "用户已存在";
			break;
		default:
			break;
	}

	ctx.status = status;
	ctx.body = message;
};

module.exports = errorHandle;
