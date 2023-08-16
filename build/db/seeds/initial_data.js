/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { id: 1, name: 'Rokus' },
        { id: 2, name: 'Tuur' },
        { id: 3, name: 'Cosima' }
      ])
    })
  await knex('rooms')
  .del()
  .then(function () {
    return knex('rooms').insert([
      {id: 1, room_id: '5f6d6a46-0c68-404a-af23-fd6d3da4ebd9'}
    ])
  })
}
