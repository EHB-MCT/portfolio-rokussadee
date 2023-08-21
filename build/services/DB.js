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
let knex
console.log(process.env.NODE_ENV, process.env.NODE_ENV === 'development')

if(process.env.NODE_ENV === 'development') {
  console.log(process.env.NODE_ENV)
  knex = require('knex')(config.development)
} else if (process.env.NODE_ENV === 'production') {
    console.log(process.env.NODE_ENV)

  knex = require('knex')(config.production)
}

module.exports = knex

