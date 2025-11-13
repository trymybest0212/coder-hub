const app = require("./app/index");
const { APP_PORT } = require("./app/config");
require('./app/database')

app.listen(APP_PORT, () => {
	console.log(`服务器启动成功,端口${APP_PORT}`);
});
