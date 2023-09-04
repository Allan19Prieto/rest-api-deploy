// Recordar que para inicializar un proyecto //
// Colocamos en nom init -y

import express, { json } from 'express' // require -> commonJS
import { moviesRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'


// Como leer un json en ESmodules
// import fs from 'node:fs'
// const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'))

// Como leer un json en ESmodules recomendado por ahora
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url) // el meta url: tiene info del archivo actual
const movies = require('./movies.json')

const app = express()
app.use(json())
app.use(corsMiddleware())
app.disable('x-powered-by') // desabilitar el header x-powered-By: Express

// Todos los recursos que sean movies se identifican con /movies
app.use('/movies', moviesRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`Servidor listening on port http://localhost:${PORT}`)
})
