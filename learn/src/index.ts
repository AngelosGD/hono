import { Hono } from "hono";

const app = new Hono();

app.get("/api/hi", (c) => {
  return c.json({
    ok: true,
    message: "xdnt",
  });
});

app.get("/user/:id", (c) => {
  const page = c.req.param("page");
  const id = c.req.param("id");
  c.header("X-messagge", "hi");
  return c.text(`you see ${page} of ${id}`);
});

export default {
  port: 3001,
  fetch: app.fetch,
};
