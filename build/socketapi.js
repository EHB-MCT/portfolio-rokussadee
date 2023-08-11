const socketIo = require('socket.io')
const {v4:uuidv4} = require('uuid')

function setupSocketIO (server) {
  const io = socketIo(server, {
  cors: {
    origin: ["http://127.0.0.1:8080","http://localhost:8080", "https://admin.socket.io"],
    credentials: true
  }
})


  io.on('connection', (socket) => {

    console.log('A user connected');
    console.log(socket.id)
    
    // Handle socket events
    socket.on('create-roomid', () => {
      // Handle the event and broadcast to other clients
      console.log('create-roomid socket hit');
      const id = uuidv4()
      socket.emit('receive-roomid', id);
    });
  
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
    
    socket.on('connect_error', (e) => {
      console.log(e) 
    })

    socket.on('set-role', role => {
      console.log("on set-role:",role )
      io.emit('increment-rollcount')
      socket.broadcast.emit('remove-role', role)
    })


    socket.on('error', (e) => {
      console.log(e)
    })
  });

  return io

}

module.exports = setupSocketIO
