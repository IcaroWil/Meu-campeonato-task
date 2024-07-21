const campeonatoService = require('../services/campeonatoService')

exports.inserirTimes = async (req, res) => {
    const { times } = req.body

    if (!times || times.length !== 8) {
        return res.status(400).json({ message: 'Devem ser inseridos exatamente 8 times' })
    }

    try {
        const result = await campeonatoService.inserirTimes(times)
        res.status(201).json(result)
    } catch (err) {
        console.error('Erro ao inserir times:', err)
        res.status(500).json({ message: 'Erro ao inserir times', error: err.message })
    }
}

exports.chaveamentoCampeonato = async (req, res) => {
    try {
        const jogos = await campeonatoService.chaveamentoCampeonato()
        res.status(200).json({ jogos })
    } catch (err) {
        console.error('Erro ao chavear o campeonato:', err)
        res.status(500).json({ message: 'Erro ao chavear o campeonato' })
    }
}

exports.simularJogo = async (req, res) => {
    const { time1_id, time2_id, fase } = req.body

    try {
        const result = await campeonatoService.simularJogo(time1_id, time2_id, fase)
        res.status(201).json(result)
    } catch (err) {
        console.error('Erro ao simular jogo:', err)
        res.status(500).json({ message: 'Erro ao simular jogo' })
    }
}

exports.verificarVencedores = async (req, res) => {
    const { fase } = req.params

    try {
        const vencedores = await campeonatoService.verificarVencedores(fase)
        res.status(200).json({ vencedores })
    } catch (err) {
        console.error('Erro ao verificar vencedores:', err)
        res.status(500).json({ message: 'Erro ao verificar vencedores' })
    }
}

exports.chaveamentoSemis = async (req, res) => {
    try {
        const jogos = await campeonatoService.chaveamentoSemis()
        res.status(200).json({ jogos })
    } catch (err) {
        console.error('Erro ao chavear as semifinais:', err)
        res.status(500).json({ message: 'Erro ao chavear as semifinais' })
    }
}

exports.chaveamentoFinalTerceiro = async (req, res) => {
    try {
        const resultado = await campeonatoService.chaveamentoFinalTerceiro()
        res.json(resultado)
    } catch (err) {
        console.error('Erro ao chavear a final e terceiro lugar:', err)
        res.status(500).json({ message: 'Erro ao chavear a final e terceiro lugar' })
    }
}

exports.recuperarCampeonatosAnteriores = async (req, res) => {
    try {
        const campeonatosAnteriores = await campeonatoService.recuperarCampeonatosAnteriores()
        res.status(200).json(campeonatosAnteriores)
    } catch (err) {
        console.error('Erro ao recuperar campeonatos anteriores:', err)
        res.status(500).json({ message: 'Erro ao recuperar campeonatos anteriores' })
    }
}
