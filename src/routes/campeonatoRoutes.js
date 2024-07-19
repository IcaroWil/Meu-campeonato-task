const express = require('express')
const router = express.Router()
const campeonatoController = require('../controllers/campeonatoController')

router.post('/inserir-times', campeonatoController.inserirTimes)
router.post('/simular-jogo', campeonatoController.simularJogo)

module.exports = router;