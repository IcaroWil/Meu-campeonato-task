const mysql = require('mysql2/promise')

async function createConnection() {
    return await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'meu_campeonato',
        port: process.env.DB_PORT || 3306
    })
}

module.exports = createConnection
