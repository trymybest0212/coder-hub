const {
    createAvatar
} = require('../services/file.service')
const {APP_HOST,APP_PORT} = require('../app/config')

const {updateUserAvatar} = require('../services/user.service')

class fileController {
    async savaAvatar(ctx, next) {
       
       try {
         const {
            mimetype,
            filename,
            size
        } = ctx.req.file;
        const {
            id
        } = ctx.user
        await createAvatar(filename, size, mimetype, id)
         const avatar_url = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`
        await updateUserAvatar(id,avatar_url)
        ctx.body = '上传成功'
       } catch (error) {
        console.log(error,'111');
       }
    }

}

module.exports = new fileController();