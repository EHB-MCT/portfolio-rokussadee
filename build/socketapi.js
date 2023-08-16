const socketIo = require('socket.io')
const {v4:uuidv4} = require('uuid');
const {createNewRoom, joinLastCreatedRoom, lastCreatedRoomID} = require('./common/roomManager.js');

function setupSocketIO (server) {
  const io = socketIo(server, {
  cors: {
    origin: ["http://127.0.0.1:8080","http://localhost:8080", "https://admin.socket.io"],
    credentials: true
  }
})


  io.on('connection', (socket) => {
    console.log('A user connected');
    console.log('# connections: ', io.engine.clientsCount)
    console.log(socket.id)

    //TODO: check if connented users count is a modulo of 3
    //if so, it is the turn of the last connected user to create a new room
    //if not, get the id of the last created room and join that room 
    
    if(io.engine.clientsCount - 1 % 3 === 0) {
      //create room
      console.log('connected socker is first of three users')
      createNewRoom(socket)
    }
    //always join room with that roomid, whether or not you are the creator
    const room_id = joinLastCreatedRoom(socket)
    socket.emit('receive-room_id', room_id)
  
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    console.log('# connections: ', io.engine.clientsCount)
    });
    
    socket.on('connect_error', (e) => {
      console.log(e) 
    })

    socket.on('set-role', role => {
      console.log("on set-role:",role )
      io.to(room_id).emit('increment-rollcount')
      socket.broadcast.to(room_id).emit('remove-role', role)
    })


    socket.on('error', (e) => {
      console.log(e)
    })
  });

  return io

}

module.exports = setupSocketIO
