import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello, Hono!");
});

app.get("/buscar", (c) => {
  const universidad = c.req.query("universidad");
  const carrera = c.req.query("carrera");
  return c.text(
    `Buscando información sobre la universidad ${universidad} y la carrera ${carrera}`,
  );
});

interface post {
  id: number;
  title: string;
  content: string;
}

const publicaciones: post[] = [
  { id: 1, title: "Post 1", content: "Contenido del post 1" },
  { id: 2, title: "Post 2", content: "Contenido del post 2" },
  { id: 3, title: "Post 3", content: "Contenido del post 3" },
];

app.get("/posts/:id", (c) => {
  const postId = parseInt(c.req.param("id"));
  const publicacion = publicaciones[postId - 1];
  return c.json(publicacion);
});

app.post("/posts", async (c) => {
  const body = await c.req.json(); // Parsear cuerpo JSON
  // En una aplicación real, lo guardarías en una base de datos
  console.log("Creating post:", body);
  return c.json({ message: "Post created successfully!", data: body }, 201); // Responder con 201 Created
});

app.delete("/posts/:id", (c) =>{
  const id = c.req.param("id")
  const pub = publicaciones[parseInt(id) - 1]

  console.log(`Eliminando post ${id}`)
  return c.json(`post ${id} con contenido ${pub.content}`)

})


app.get('/prueba', (c) =>{
  const url = c.req.url
  const metodo = c.req.method
  return c.json({url,metodo})
})

export default {
  port: 3001,
  fetch: app.fetch,
};
