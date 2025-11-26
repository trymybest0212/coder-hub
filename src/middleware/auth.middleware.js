const {verify} = require("jsonwebtoken");

const {
	NAME_OR_PASSWORD_IS_REQUIRE,
	USER_IS_NOT_EXIST,
	PASSWORD_IS_ERROR,
} = require("../constant/error.type");
const {
	getUserByName
} = require("../services/user.service");
const md5Password = require("../utils/handle-password");
const {PUBLIC_KEY} = require('../app/config')
const {NO_AUTHORIZATION}  = require('../constant/error.type')

const verifyLogin = async (ctx, next) => {
	// 不为空
	const {
		name,
		password
	} = ctx.request.body;
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

	if (result[0] ?.[0].password !== md5Password(password)) {
		const error = new Error(PASSWORD_IS_ERROR);
		return ctx.app.emit("error", error, ctx);
	}
	ctx.user = result[0] ?.[0] || {};
	await next();
};

const verifyAuth = async (ctx, next) => {
	// 获取token
	const authorization = ctx.headers.authorization;
	const token = authorization.replace('Bearer ', '')
	// 验证token
	try {
		const result = verify(token, PUBLIC_KEY, {
		algorithms: ['RS256']
	})
	ctx.user = result;
	 await next();
	} catch (err) {
		console.log(err, '2222');
		const error = new Error(NO_AUTHORIZATION)
		ctx.app.emit('error',error,ctx)
	}


}
module.exports = {
	verifyLogin,
	verifyAuth
};