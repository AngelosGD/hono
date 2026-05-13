import { Hono } from "hono";
import { createMiddleware } from "hono/factory";
import src from "..";


export const timingMiddleware = createMiddleware(async (c,next) =>{
    const start = Date.now()
    await next()
    const ms = Date.now() - start
    c.res.headers.set('X-Response-Time', `respuesta en ${ms}ms`)
    console.log(`procesado en ${ms}ms`)
})


