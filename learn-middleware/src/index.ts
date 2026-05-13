import { Hono } from "hono";
import { logger } from "hono/logger";
import { timingMiddleware } from "./middlewares/timing";
import { secureApiKeyAuth } from "./middlewares/auth";
import { HTTPException } from "hono/http-exception";

const app = new Hono();

app.use(logger());
app.use(timingMiddleware);

app.get("/", (c) => {
  return c.text("alo desde hono con un middleware creado");
});

app.use("/secure/data/*", secureApiKeyAuth);

app.get("/secure/data/profile", (c) => {
  // const user = c.get('user') // Acceder a la variable establecida por el middleware
  return c.json({ profileData: "informacion sensible" /*user: user */ });
});

app.get("/secure/data/admin", (c) => {
  return c.json({
    profileDataAdmin: "informacion de admin, ingresa la apikeyssss",
  });
});

app.get("/public/data", (c) => {
  return c.text("esta info es publica, no protegida");
});

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }
  console.log("error: ", err.message);
  return c.json({ error: "internal error caon", message: err.message }, 500);
});

export default {
  port: 3001,
  fetch: app.fetch,
};
