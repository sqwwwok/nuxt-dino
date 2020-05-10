const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()

const cookieParser = require('cookie-parser'), 
requestLog = require('./middlewares/logRequest'),
login = require('./controllers/GET-login'),
register = require('./controllers/GET-register'),
check = require('./controllers/GET-check'),
advise = require('./controllers/GET-advise'),
upload = require('./controllers/GET-upload');

app.use(cookieParser());
app.use(requestLog());
app.get('/login',login());
app.get('/register',register());
app.get('/check',check());
app.get('/advise',advise());
app.get('/upload',upload())