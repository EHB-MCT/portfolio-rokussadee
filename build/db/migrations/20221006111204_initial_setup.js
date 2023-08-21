/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  knex.schema.createTable('users', function (table) {
    table.increments('id')
    table.string('name', 255).notNullable()
  }),
  knex.schema.createTable('rooms', function (table) {
    table.increments('id')
    table.string('room_id', 255).notNullable()
  }),
      knex.schema.createTable('room_user', function (table) {
    table.increments('id')
    table.integer('room_id', 255).notNullable()
    table.integer('user_id', 255).notNullable()
  })

}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  knex.schema.dropTable('users')
  knex.schema.dropTable('users')
}
