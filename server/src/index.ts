import express from 'express'
import http from 'http'
import { Server, Socket } from 'socket.io'
import { errorHandler, loggingHandler } from './handlers/handlers'
import router from './routes/routes'

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
app.use('/api', router)
app.use(loggingHandler)
app.use(errorHandler)

server.setTimeout(1000)

socket.on('connection', (socket: Socket) => {
  console.log('Connection Established')

  socket.on('login', (user) => {
    console.log(user)
  })
})

server.on('error', (error) => {

})

server.listen(port, () => {
  console.log('Server listening:', port)
})