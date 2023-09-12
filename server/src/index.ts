import express from 'express'
import dotenv from 'dotenv'
import http from 'http'
import { Server } from 'socket.io'
import socketEvents from './routes/webSocketRoutes'
import { dbConnect } from './database/database'
dotenv.config()

export const { ATLAS_URI } = process.env
dbConnect()

if (!ATLAS_URI) {
  console.error('No Atlas URI variable defined')
  process.exit(1)
}

const port = 3000
const app = express()
export const httpServer = http.createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:8100',
    methods: ['GET', 'POST']
  }
})

io.on('connection', socketEvents)

httpServer.listen(port, () => {
  console.log('Server listening:', port)
})