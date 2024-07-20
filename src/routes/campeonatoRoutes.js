const express = require('express');
const router = express.Router();
const campeonatoController = require('../controllers/campeonatoController');

router.post('/inserir-times', campeonatoController.inserirTimes);
router.get('/chaveamento', campeonatoController.chaveamentoCampeonato);
router.post('/simular-jogo', campeonatoController.simularJogo);
router.get('/verificar-vencedores/:fase', campeonatoController.verificarVencedores);
router.get('/chaveamento-semis', campeonatoController.chaveamentoSemis);
router.get('/chaveamento-final-terceiro', campeonatoController.chaveamentoFinalTerceiro);

module.exports = router;
