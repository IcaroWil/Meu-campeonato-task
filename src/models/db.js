const mysql = require('mysql')
const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'meu_campeonato',
    port: process.env.DB_PORT || 3306
})

connection.connect((err) => {
    if (err) throw err
    console.log('Conectando ao banco de dados MySQL');
})

module.exports = connection
