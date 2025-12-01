const fs = require('fs')
const { createUserService } = require("../services/user.service");
const {getAvatarService} = require('../services/file.service')
const {FILE_PATH} = require('../constant/file-path')
class UserController {
	async createUser(ctx, next) {
		await createUserService(ctx.request?.body);
		ctx.body = "新增成功";
	}
	async getAvatarInfo(ctx,next) {
	const {userId} = ctx.params;
	const {filename,mimeType} = await getAvatarService(userId);
	ctx.response.set('content-type', `${mimeType}`);
	const res = await fs.createReadStream(`${FILE_PATH}/${filename}`)
	ctx.body = res
	}
}

module.exports = new UserController();
