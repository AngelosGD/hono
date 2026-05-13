import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";

const VALID_API_KEY = "otrasecretkeyy";

type Env = {
  Variables: {
    user?: { id: string };
  };
  // Bindings: { MY_KV_NAMESPACE: KVNamespace } // Ejemplo para Cloudflare Workers
};

export const secureApiKeyAuth = createMiddleware<Env>(async (c, next) => {
    const apiKey = c.req.header('Autorizacion')?.replace('Bearer','')

    if(apiKey === VALID_API_KEY){
        c.set('user',{id:'123'})
        await next()
    } else{
        throw new HTTPException(401, {message:'no autorizado caon: mala api key'})
    }


});
