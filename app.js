const express = require('express')
const bodyParser = require('body-parser')
const campeonatoRoutes = require('./src/routes/campeonatoRoutes')
const { waitForDatabase } = require('./src/utils/dbUtils')

const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use('/api/campeonato', campeonatoRoutes)

waitForDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`)
    })
})
