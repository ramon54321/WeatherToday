"use strict";

var _database = require("./database");

var _database2 = _interopRequireDefault(_database);

var _koa = require("koa");

var _koa2 = _interopRequireDefault(_koa);

var _koaSend = require("koa-send");

var _koaSend2 = _interopRequireDefault(_koaSend);

var _koaRouter = require("koa-router");

var _koaRouter2 = _interopRequireDefault(_koaRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = new _koa2.default();
const routerMain = new _koaRouter2.default();
const routerApi = new _koaRouter2.default({ prefix: "/api" });

/**
	Router API
	First catch all api requests, remember /api is set as a prefix above.
	Then catch specific request and send response.
	If no specific request is caught, catch all api requests again to throw error.
*/
routerApi.get("/*", async (ctx, next) => {
	console.log("[INFO] API requested");
	await next();
});
routerApi.get("/temperature", async ctx => {
	console.log("[INFO] Serving API: Temperature");
	ctx.body = "api";
});
routerApi.get("/*", async ctx => {
	console.log("[WARNING] Invalid API requested");
	ctx.throw(400, "Invalid api request");
});

/**
	Router Main
	Catch all requests, excluding api because they were set above.
	Try to find a static file for the request starting from the static folder.
*/
routerMain.use(routerApi.routes());
routerMain.get("/*", async ctx => {
	console.log("[INFO] Serving static file from " + ctx.request.url);
	await (0, _koaSend2.default)(ctx, ctx.path, { root: __dirname + '/../static' });
});

/**
	Register routes to koa and start listening.
*/
app.use(routerMain.routes());
app.listen(3000);

console.log("[INFO] Server Started");