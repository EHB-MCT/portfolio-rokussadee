const db = require('../services/DB')

const dbFunctions = {
  insertNewRoom(roomData) {
    return db.insert(roomData).returning('*').into('rooms')
  },

  findExistingRoom(room_id) {
    return db.table('rooms').where('room_id', room_id).first();
  },

  insertNewUser(userData){
    return db.insert(userData).returning('*').into('users');
  },
  
  findExistingUserByName(user_name) {
    return db.table('users').where('name', user_name).first();
  },

  insertNewRelationship(room_id, user_id) {
    const relationShipData = {
      room_id: room_id,
      user_id: user_id
    }
    return db.insert(relationShipData).returning('*').into('room_user')
  }
}

module.exports = dbFunctions
