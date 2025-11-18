const { sign } = require("jsonwebtoken");

const { PRIVATE_KEY } = require("../app/config");

class AuthController {
	async login(ctx, next) {
		const { name, id } = ctx.user;
		const token = sign(
			{
				id,
				name,
			},
			PRIVATE_KEY,
			{
				expiresIn: 60 * 60 * 24 * 365,
				algorithm: "RS256",
			}
		);
		ctx.body = JSON.stringify({ token });
	}
}

module.exports = new AuthController();
