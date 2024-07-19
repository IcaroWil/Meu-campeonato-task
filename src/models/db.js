const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'meu_campeonato'
})

connection.connect((err) => {
    if (err) throw err
    console.log('Conectando ao banco de dados MySQL');
})

module.exports = connection