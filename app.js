const express = require('express')
const bodyParser =  require('body-parser')
const app = express()

app.use(bodyParser.json())

const campeonatoRoutes = require('./src/routes/campeonatoRoutes')
app.use('/api/campeonato', campeonatoRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});