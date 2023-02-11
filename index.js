import express from 'express'
import { authRouter } from './routes/auth.routes.js'
import dotenv from 'dotenv'
import { connectDb } from './config/db.js'
import cors from 'cors'
import { eventRouter } from './routes/event.routes.js'

// Initializing env variables
dotenv.config()

// Express app
const app = express()

// Cors
app.use(cors())

// Public dir
app.use(express.static('public'))

// JSON Support
app.use(express.json())

// Routes
app.use('/api/auth', authRouter)
app.use('/api/event', eventRouter)

// Listening request
app.listen(process.env.PORT, async () => {
  await connectDb()
  console.log(`Servidor corriendo en el puerto ${process.env.PORT}`)
})
