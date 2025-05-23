import knex from 'knex'
import config from '../../knexfile.js'

export const dbKnex = knex(config)
