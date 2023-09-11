import express from 'express'
import http from 'http'
import { errorHandler, loggingHandler } from './handlers/handlers'
import { Server, Socket } from 'socket.io'
import router from './routes/routes'

const port = 3000
const app = express()
export const httpServer = http.createServer(http)

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:8100',
    methods: ['GET', 'POST']
  }
})

io.on('connection', (socket: Socket) => {
  console.log('Server Client Connected', socket.id)

  socket.on('login', (user) => {
    console.log('Login:', user)

    socket.emit('login', `Hello ${user.username}`)
  })
})

// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
// app.use('/api', router)
// app.use(loggingHandler)
// app.use(errorHandler)

httpServer.listen(port, () => {
  console.log('Server listening:', port)
})