const fs = require("fs");

const useAllRoutes = function () {
	const files = fs.readdirSync(__dirname);
	files.forEach((file) => {
		if (file === "index.js") return;
		const router = require(`./${file}`);
		this.use(router.routes());
		this.use(router.allowedMethods());
	});
};
module.exports = useAllRoutes;
