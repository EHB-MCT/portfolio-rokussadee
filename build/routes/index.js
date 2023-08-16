const express = require('express')
const router = express.Router()
const path = require('path')
const http = require('http')
const validateUuid = require('uuid-validate')
const dbFunctions = require('../db/dbfunctions.js')

/**
 * GET the home page
 *
 * @returns {Object}  An object containing a key-value pair: message(string)
*/
router.get('/', function (req, res) {
})

//router.post('/save-room', async function(req,res) {
//  console.log(req.body)
//  const room_id = req.body.room_id
//  if (validateUuid(room_id, 4)) {
//    try {
//      const existingRoom = await dbFunctions.findExistingRoom(room_id)
//        console.log('existingRoom: ', existingRoom)
//      if (existingRoom) {
//        const existingRoomResponse = {
//          is_new: false,
//          room: existingRoom
//        }
//        res.send(existingRoomResponse)
//      } else {
//        const roomData = {
//          room_id: room_id 
//        }
//        const newRoom = await dbFunctions.insertNewRoom(roomData)
//        const newRoomResponse = {
//          is_new: true,
//          room: newRoom[0]
//        }
//        res.send(newRoomResponse)
//      }
//    } catch(error) {
//      console.error('Error in POST "save-room":', error)
//      throw error
//    }
//  } else {
//    throw(new Error("room_id was not a valid uuid (v4)"))
//  }
//})

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
        console.log('existingRoomResponse:', existingRoomResponse)
        res.send(existingRoomResponse)
      } else {
        const roomData = {
          room_id: room_id 
        }
        const newRoom = await dbFunctions.insertNewRoom(roomData)
        const newRoomResponse= {
          is_new: true,
          room: newRoom[0]
        }
        console.log('newRoomResponse:', newRoomResponse)
        res.send(newRoomResponse)
      }
    } catch(error) {
      console.error('Error in POST "save-room":', error)
      throw error
    };
  } else {
    throw(new Error("room_id was not a valid uuid (v4)"))
  }
});

/**
 * GET all users saved in the database
 *
 * @returns {[Object]}  An array of objects each containing the necessary key-value pairs of each user: id(int) & name(string)
 */
router.get('/allusers', function (req, res) {
  db.table('users').select().then(data => {
    console.log(data)
    res.send(data)
  })
})

/**
 * GET a user object by their id from the database.
 *
 * @param   {number}    id  A number that corresponds with an id in the users table.
 * @returns {[Object]}      An array containing one object with properties id(int) and name(string) belonging to an item in the user table of the database.
 */
router.get('/user/:id', function (req, res) {
  // const {userid} = req.params
  console.log(req.params)
  db.table('users').where({ id: req.params.id }).select().then(function (data) {
    res.send(data)
  })
})

/**
 * POST a user object that contains properties id(int) and name(string) to the database
 *
 * @param   {Object | [Object]} object      An object or an array of objects containing the necessary key-value pairs for the creation of a new user
 * @param   {number}            object.id   A number that serves as a unique id to refer to in the users table
 * @param   {string}            object.name A string for the name of the user
 * @returns {[Object]}                      Returns an array of one or more objects of the created user
 */
router.post('/makeuser', function (req, res) {
  db.insert(req.body).returning('*').into('users').then(function (data) {
    res.send(data)
  })
})

module.exports = router

