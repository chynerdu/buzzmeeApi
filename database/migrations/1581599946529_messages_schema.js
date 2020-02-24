'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MessagesSchema extends Schema {
  up () {
    this.create('messages', (table) => {
      table.increments()
      table.timestamps()
      table.text('body')
      table.integer('sender_id').unsigned()
      table
      .foreign('sender_id')
      .references('users.id')
      .onDelete('cascade')
    })
  }

  down () {
    this.drop('messages')
  }
}

module.exports = MessagesSchema
