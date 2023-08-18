const {config} = require('../knexfile')

const environment = process.env.NODE_ENV
const configProps = config[environment]

//TODO: fix dynamic env path (not working with bracket accessors)

//console.log('config:', config);
//console.log('environment:', environment);
//console.log(config[environment])
//console.log('configProps:', configProps)
//console.log('spread props in object: ', configProps)

//const knex = require('knex')({...configProps})
const knex = require('knex')(config.development)

module.exports = knex

