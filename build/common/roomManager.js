const {v4:uuidv4} = require('uuid');

let lastCreatedRoomID = null;

let roomData = {}

function createNewRoom(socket) {
  //create room-id
  const room_id = uuidv4()
  lastCreatedRoomID = room_id;
  roomData[room_id] = {users: []}
  console.log(`new room with id ${lastCreatedRoomID} got created by user with id ${socket.id}`)
}

function joinLastCreatedRoom(socket) {
  if (lastCreatedRoomID) {
    socket.join(lastCreatedRoomID);
    console.log(`user with socket id ${socket.id} joined room ${lastCreatedRoomID}`)
    return lastCreatedRoomID
  }
}

function linkUserToRoom(room_id, user_db_id) {
  console.log(roomData)
  console.log(roomData[room_id].users)
  roomData[room_id]['users'].push(user_db_id)
}

module.exports = {
  createNewRoom,
  joinLastCreatedRoom,
  lastCreatedRoomID,
  linkUserToRoom
};
