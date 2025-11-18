const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const json = require("koa-json");

const useAllRoutes = require("../router/index");
const errorHandle = require("./error.handle");

const app = new Koa();
app.useAllRoutes = useAllRoutes;

app.use(bodyParser());
app.use(json());
app.useAllRoutes();

app.on("error", errorHandle);

module.exports = app;
