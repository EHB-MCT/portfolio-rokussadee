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
      ]);
    });
};
