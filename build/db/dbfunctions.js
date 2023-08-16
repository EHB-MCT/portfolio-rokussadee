const db = require('../services/DB')

const dbFunctions = {
  insertNewRoom(roomData) {
    return db.insert(roomData).returning('*').into('rooms')
  },

  findExistingRoom(room_id) {
    return db.table('rooms').where('room_id', room_id).first();
  }
}

module.exports = dbFunctions
