const express = require('express')
const router = express.Router()
const path = require('path')
const http = require('http')
const validateUuid = require('uuid-validate')
const dbFunctions = require('../db/dbfunctions.js')


/**
 * POST a room object that contains properties id(int) and room_id(string/uuid) to the database
 *
 * @param   {Object}            object                An object containing the necessary key-value pairs for the creation of a new room
 * @param   {string}            object.room_id        A string representing a unique uuid for the room
 * 
 * @returns {Object}            Object                Returns an object with information about the created room
 * @returns {Object}            object.room           An object of the room itself
 * @returns {Boolean}           object.is_new         A boolean representing if the room was created or found
 * @returns {Number}            object.room.id        The database ID of the created/found room
 * @returns {String}            object.room.room_id   The uuid that represents the room
*/
router.post('/save-room', async function(req,res) {
  console.log(req.body)
  const room_id = req.body.room_id
  if (validateUuid(room_id, 4)) {
    try {
      const existingRoom = await dbFunctions.findExistingRoom(room_id)
        console.log('existingRoom: ', existingRoom)
      if (existingRoom) {
        const existingRoomResponse = {
          is_new: false,
          room: existingRoom
        }
        res.status(200).send(existingRoomResponse)
      } else {
        const roomData = {
          room_id: room_id 
        }
        const newRoom = await dbFunctions.insertNewRoom(roomData)
        const newRoomResponse= {
          is_new: true,
          room: newRoom[0]
        }
        res.status(200).send(newRoomResponse)
      }
    } catch(error) {
      res.status(500).send({error: "Error in POST /rooms/save-room"});
    };
  } else {
    res.status(400).send({error: "room_id was not a valid uuid (v4)"})
  }
});

/**
 * POST a relationship object that contains properties id(int) room_id(string/uuid) and user_id(int) to the database
 *
 * @param   {Object}            object                An object containing the necessary key-value pairs for the creation of a new room
 * @param   {Number}            object.room_id        The ID of the room that will be related to a user 
 * @param   {Number}            object.user_id        The ID of the User that will be related to the room 

 * 
 * @returns {Object}            Object                Returns an object with information about the created room
 * @returns {Object}            object.room_id        The foreign key of the room
 * @returns {String}            object.user_id        The foreign key of the user
*/
router.post('/save-relationship', async function(req, res) {
  console.log('body: ',req.body)
  const room_id = req.body.room_id
  const user_id = req.body.user_id
  if(isNaN(room_id)|| isNaN(user_id )) {
    console.log(`room id ${room_id} with type ${typeof room_id} and user_id ${user_id} with type ${typeof user_id}`)
    res.status(400).send({error: "passed values were not of the right type"})
  } else if (!room_id || !user_id) {
    res.status(400).send({error: "one or more values were not provided"})
  } else {
    try {
      const newRelationshipResponse = await dbFunctions.insertNewRelationship(room_id, user_id)
      res.status(200).send(newRelationshipResponse[0])
    } catch(error) {
      res.status(500).send({error: "Error in  POST /rooms/save-relationship"})
    }
  } 
})


module.exports = router

