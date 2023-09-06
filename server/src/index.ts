import express from 'express'
import http from 'http'
import { Server, Socket } from 'socket.io'
import cors from 'cors'

const port = 3000
const app = express()
const server = http.createServer(app)
const socket = new Server(server, {
  cors: {
    origin: 'http://localhost:8100',
    methods: ['GET', 'POST']
  }
})

app.use(express.json())

socket.on('connection', (socket: Socket) => {
  console.log('Connection Established')
  
})

server.listen(port, () => {
  console.log('Server listening:', port)
})