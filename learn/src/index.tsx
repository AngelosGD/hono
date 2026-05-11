import { Hono } from 'hono'
import { basicAuth } from 'hono/basic-auth'

const app = new Hono()

const View = ( ) =>{
  return (
    <html>
      <body>
        <h1>Hello HONO</h1>
      </body>
    </html>
  )
}


app.get('/raw', (c) =>{
  return c.text('Raw response')
})


app.get('/home', (c) =>{
  return c.html(<View />)
})


app.use(
  '/auth/*',
  basicAuth({
    username: 'angel',
    password: '1234',
  })
)

app.get('/auth', (c) =>{
  return c.text('autorizado caon')
})


export default app