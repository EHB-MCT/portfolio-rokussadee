const express = require('express')
const helpers = require('../common/helper')
const dbFunctions = require('../db/dbfunctions')
const router = express.Router()

/*
 * POST a user object that contains properties id(int) and name(string) to the database * 
 *
 * @param   {Object}            object        An object or an array of objects containing the necessary key-value pairs for the creation of a new user 
 * @param   {string}            object.name   A string for the name of the user
 * @returns {Object}                          Returns an object of the created user
 */
router.post('/save-user', async function (req,res) {
  const user_name = req.body.user_name
  if (helpers.checkStringLength(user_name)) {
    try {
      const existingUser = await dbFunctions.findExistingUserByName(user_name)
      if (existingUser) {
        const existingUserResponse = {
          is_new: false,
          user: existingUser
        }
        res.status(200).send(existingUserResponse)
      } else {
        const userData = {
          name: user_name
        }
        const newUser = await dbFunctions.insertNewUser(userData)
        const newUserResponse = {
          is_new: true,
          user: newUser[0]
        }
        res.status(200).send(newUserResponse)
      }
    } catch(error) {
      console.log(error)
      res.status(500).send({error: "Error in POST users/save-user"})
    }
  } else {
    res.status(400).send({error: "user_name needs to be between 8 and 15 characters long"})
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

module.exports = router

