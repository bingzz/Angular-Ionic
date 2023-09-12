import { Socket } from "socket.io"
import { disconnected, login, register } from "./routes"

const socketEvents = async (socket: Socket) => {
  console.log('Server Client Connected', socket.id)

  socket.on('disconnect', disconnected)

  socket.on('login', (loginUser) => login(socket, loginUser))
  socket.on('register', async (registerUser) => register(socket, registerUser))
}

export default socketEvents