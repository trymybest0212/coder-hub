const {
	NAME_OR_PASSWORD_IS_REQUIRE,
	NAME_OR_PASSWORD_IS_NOT_VAILD,
	NAME_IS_NOT_UNIQUE,
	USER_IS_NOT_EXIST,
	PASSWORD_IS_ERROR,
	NO_AUTHORIZATION
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
		case USER_IS_NOT_EXIST:
			status = 400;
			message = "用户不存在";
			break;
		case PASSWORD_IS_ERROR:
			status = 400;
			message = "密码错误";
			break;
			case NO_AUTHORIZATION:
			status = 401;
			message = "无效token";
			break;
		default:
			break;
	}

	ctx.status = status;
	ctx.body = message;
};

module.exports = errorHandle;
