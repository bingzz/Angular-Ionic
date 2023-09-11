import { Server, Socket } from 'socket.io'
import { httpServer } from '..'

export const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:8100',
    methods: ['GET', 'POST']
  }
})

io.use((socket, next) => {
  console.log('middleware invoked');
  next()
})

io.on('connection', (socket: Socket) => {
  console.log('Server Client Connected', socket.id)

  socket.on('register', () => {
    console.log('register user');
  })
})

export default io