const {v4:uuidv4} = require('uuid');

let lastCreatedRoomID = null;

function createNewRoom(socket) {
  //create room-id
  const room_id = uuidv4()
  lastCreatedRoomID = room_id;
  console.log(`new room with id ${lastCreatedRoomID} got created by user with id ${socket.id}`)
}

function joinLastCreatedRoom(socket) {
  if (lastCreatedRoomID) {
    socket.join(lastCreatedRoomID);
    console.log(`user with socket id ${socket.id} joined room ${lastCreatedRoomID}`)
    return lastCreatedRoomID
  }
}

module.exports = {
  createNewRoom,
  joinLastCreatedRoom,
  lastCreatedRoomID
};
