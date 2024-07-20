const createConnection = require('../models/db')

async function waitForDatabase() {
    while (true) {
        try {
            const connection = await createConnection()
            console.log('Banco de dados conectado com sucesso!')
            connection.end()
            break
        } catch (err) {
            console.error('Erro ao conectar ao banco de dados:', err.message)
            console.log('Banco de dados não está pronto. Tentando novamente...')
            await new Promise(resolve => setTimeout(resolve, 10000))
        }
    }
}

module.exports = {
    waitForDatabase
}
