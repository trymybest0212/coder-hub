const path = require('path')
const Multer = require('koa-multer')
const jimp = require('jimp')
const {
    FILE_PATH,
    PICTURE_PATH
} = require('../constant/file-path')
const avatarUpload = Multer({
    dest: FILE_PATH
})
const avatarHandle = avatarUpload.single('avatar');

const pictureUpload = Multer({
    dest: PICTURE_PATH
})
const pictureHandle = pictureUpload.array('picture', 9);

const pictureReSize = async (ctx, next) => {
    try {
        const files = ctx.req.files;
        for (let file of files) {
            const destPath = path.join(file.destination, file.filename)
            jimp.read(file.path).then((image) => {
                image.resize(1200, jimp.AUTO).write(`${destPath}-large`);
                image.resize(640, jimp.AUTO).write(`${destPath}-middle`);
                image.resize(320, jimp.AUTO).write(`${destPath}-small`)
            })
        }
        await next()
    } catch (error) {
        console.log(error, '写入图片失败');
    }

}

module.exports = {
    avatarHandle,
    pictureHandle,
    pictureReSize
}