const express = require('express')
const campeonatoController = require('../controllers/campeonatoController')

const router = express.Router()

router.post('/inserir-times', campeonatoController.inserirTimes)
router.get('/chaveamento', campeonatoController.chaveamentoCampeonato)
router.post('/simular-jogo', campeonatoController.simularJogo)
router.get('/verificar-vencedores/:fase', campeonatoController.verificarVencedores)
router.get('/chaveamento-semis', campeonatoController.chaveamentoSemis)
router.get('/chaveamento-final-terceiro', campeonatoController.chaveamentoFinalTerceiro)
router.get('/campeonatos-anteriores', campeonatoController.recuperarCampeonatosAnteriores)

module.exports = router
