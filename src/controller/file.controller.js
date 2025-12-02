const {
    createAvatar,
    createPicture
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
        ctx.body = '头像上传成功'
       } catch (error) {
        console.log(error,'头像上传失败');
       }
    }
    async savaPicture(ctx,next) {
          const {
            id
        } = ctx.user
        const {moment_id} =  ctx.query
        const files = ctx.req.files;
        for(const file of files) {
            const {
            mimetype,
            filename,
            size
        } = file;
         await createPicture(filename, size, mimetype, id,moment_id)
        }
        ctx.body="图片上传成功"
    }

}

module.exports = new fileController();