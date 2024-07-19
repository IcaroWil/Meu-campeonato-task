const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const createConnection = require('./src/models/db')


function waitForDatabase(callback) {
    const attemptConnection = () => {
        const connection = createConnection()
        
        connection.connect((err) => {
            if (err) {
                console.error('Erro ao conectar ao banco de dados:', err.message)
                console.log('Banco de dados não está pronto. Tentando novamente...')
                setTimeout(attemptConnection, 10000) 
            } else {
                console.log('Banco de dados conectado com sucesso!')
                connection.end()
                callback()
            }
        })
    }

    attemptConnection()
}

app.use(bodyParser.json())

const campeonatoRoutes = require('./src/routes/campeonatoRoutes')
app.use('/api/campeonato', campeonatoRoutes)

const PORT = process.env.PORT || 3000

waitForDatabase(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`)
    })
})
