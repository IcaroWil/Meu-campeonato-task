const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const createConnection = require('./src/models/db')

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

app.use(bodyParser.json())

const campeonatoRoutes = require('./src/routes/campeonatoRoutes')
app.use('/api/campeonato', campeonatoRoutes)

const PORT = process.env.PORT || 3000

waitForDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`)
    })
})
