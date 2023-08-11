const express = require('express')
const router = express.Router()
const db = require('../services/DB')
const path = require('path')
const http = require('http')

/**
 * GET the home page
 *
 * @returns {Object}  An object containing a key-value pair: message(string)
*/
router.get('/', function (req, res) {
})

router.post('/create-room', async function(req,res) {
  console.log(req.body)
  const room_id = req.body.room_id
  try {
    const existingRoom = await db.table('rooms').where('room_id', room_id).first();
    console.log('existingRoom: ',existingRoom)
    if (existingRoom) {
      res.send(existingRoom)
    } else {
      const roomData = {
        room_id: room_id 
      }
      const newRoom = await db.insert(roomData).returning('*').into('rooms')
      console.log('newRoom: ', newRoom)
      res.send(newRoom[0])
    }
  } catch(error) {
    console.error('Error in POST "create-room":', error)
    throw error
  }
})

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

