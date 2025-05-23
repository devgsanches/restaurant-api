export default {
  client: 'sqlite3',
  connection: {
    filename: './src/database/database.db',
  },
  useNullAsDefault: true,
  migrations: {
    extensions: 'ts',
    directory: './src/database/migrations',
  },
  seeds: {
    extensions: 'ts',
    directory: './src/database/seeds',
  },
  pool: {
    afterCreate: (conn: any, cb: any) => {
      conn.run('PRAGMA foreign_keys = ON', cb)
    }, // habilita restrição de chaves estrangeiras
  },
}
