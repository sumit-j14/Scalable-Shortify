const { Pool, Client } = require('pg')
require('dotenv').config()

const client = new Client({
    user: process.env.username,
    host: 'localhost',
    database: 'url',
    password: process.env.password,
    port: process.env.database_port,
  })
  client.connect()
module.exports= client;