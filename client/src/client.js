import {io} from "socket.io-client";

localStorage.debug = 'socket.io-client:socket'

console.log("clientjs")

const socket = io('http://localhost:3000')

socket.on('connect', () => {
  console.log(socket.id)

  socket.emit('customevent', 10, 'hi', {a: 'a'})
})

