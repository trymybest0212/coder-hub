const Koa = require("koa");
const bodyParser = require("koa-bodyparser");

const useAllRoutes = require("../router/index");
const errorHandle = require("./error.handle");

const app = new Koa();
app.useAllRoutes = useAllRoutes;

app.use(bodyParser());

app.useAllRoutes();
app.on("error", errorHandle);

module.exports = app;
