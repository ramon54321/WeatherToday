import database from "./database"
import koa from "koa"
import send from "koa-send"
import Router from "koa-router"
import koaBody from "koa-body"

const app = new koa()
const routerMain = new Router()
const routerApi = new Router({prefix: "/api"})

/**
	Router API
	First catch all api requests, remember /api is set as a prefix above.
	Then catch specific request and send response.
	If no specific request is caught, catch all api requests again to throw error.
*/
routerApi.all("/*", async (ctx, next) => {
	console.log("[INFO] API requested");
	await next()
})
routerApi.get("/temperature", async ctx => {
	console.log("[INFO] Serving API [GET]: Temperature");
	ctx.body = await database.getData()
})
routerApi.post("/temperature", koaBody(), async ctx => {
	console.log("[INFO] Serving API [POST]: Temperature");
	await database.addNew(ctx.request.body.location, ctx.request.body.temperature)
	ctx.body = "done";
})
routerApi.all("/*", async ctx => {
	console.log("[WARNING] Invalid API requested");
	ctx.throw(400, "Invalid api request")
})

/**
	Router Main
	Catch all requests, excluding api because they were set above.
	Try to find a static file for the request starting from the static folder.
*/
routerMain.use(routerApi.routes())
routerMain.get("/*", async ctx => {
	console.log("[INFO] Serving static file from " + ctx.request.url);
	await send(ctx, ctx.path, { root: __dirname + '/../static' })
})

/**
	Register routes to koa and start listening.
*/
app.use(routerMain.routes())
app.listen(3000)

console.log("[INFO] Server Started");
