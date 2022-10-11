const mariadb = require("mariadb")

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    port: process.env.DB_PORT,
    connectionLimit: process.env.DB_CONN_LIMIT,
}

const pool = mariadb.createPool(config)

module.exports = pool 