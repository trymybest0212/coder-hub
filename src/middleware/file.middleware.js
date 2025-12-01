const Multer = require('koa-multer')
const {FILE_PATH} = require('../constant/file-path')
const avatarUpload = Multer({
    dest: FILE_PATH
})
const avatarHandle = avatarUpload.single('avatar');

module.exports = avatarHandle