import { dbKnex } from '../knex.js'

export async function up(knex: typeof dbKnex): Promise<void> {
  await knex.schema.createTable('products', table => {
    table.increments('id').primary()
    table.string('name')
    table.decimal('price')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex: typeof dbKnex): Promise<void> {
  await knex.schema.dropTable('products')
}
