const createConnection = require('../models/db')


exports.inserirTimes = async (req, res) => {
    const { times } = req.body

    if (!times || times.length !== 8) {
        return res.status(400).json({ message: 'Devem ser inseridos exatamente 8 times' })
    }

    const values = times.map(time => [time])

    try {
        const db = await createConnection()
        await db.query('DELETE FROM times') 
        const [result] = await db.query('INSERT INTO times (nome) VALUES ?', [values])

        if (result.affectedRows === times.length) {
            res.status(201).json({ message: 'Times inseridos com sucesso!' })
        } else {
            res.status(500).json({ message: 'Erro ao inserir todos os times' })
        }
    } catch (err) {
        console.error('Erro ao inserir times:', err)
        res.status(500).json({ message: 'Erro ao inserir times', error: err.message })
    }
}


exports.chaveamentoCampeonato = async (req, res) => {
    try {
        const db = await createConnection()
        
        const [times] = await db.query('SELECT * FROM times')
        if (times.length !== 8) {
            return res.status(400).json({ message: 'O campeonato deve ter exatamente 8 times' })
        }

        const shuffle = array => array.sort(() => Math.random() - 0.5)
        let jogos = []
        let timesRestantes = shuffle(times.slice())

        
        let faseJogos = []
        while (timesRestantes.length > 1) {
            const time1 = timesRestantes.pop()
            const time2 = timesRestantes.pop()
            faseJogos.push({ time1_id: time1.id, time2_id: time2.id, fase: 'quartas' })
        }
        jogos = jogos.concat(faseJogos)

        res.status(200).json({ jogos })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Erro ao chavear o campeonato' })
    }
}


exports.simularJogo = async (req, res) => {
    const { time1_id, time2_id, fase } = req.body

    const gol_time1 = Math.floor(Math.random() * 8)
    const gol_time2 = Math.floor(Math.random() * 8)

    const sql = 'INSERT INTO jogos (time1_id, time2_id, gol_time1, gol_time2, fase) VALUES (?, ?, ?, ?, ?)'
    try {
        const db = await createConnection()
        const [result] = await db.query(sql, [time1_id, time2_id, gol_time1, gol_time2, fase])

        res.status(201).json({ message: 'Jogo simulado com sucesso!', gol_time1, gol_time2 })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Erro ao simular jogo' })
    }
}


exports.verificarVencedores = async (req, res) => {
    const { fase } = req.params
    try {
        const db = await createConnection()
        const [jogos] = await db.query('SELECT * FROM jogos WHERE fase = ?', [fase])

        if (jogos.length === 0) {
            return res.status(404).json({ message: 'Nenhum jogo encontrado para esta fase' })
        }

        const vencedores = []
        for (const jogo of jogos) {
            if (jogo.gol_time1 > jogo.gol_time2) {
                vencedores.push(jogo.time1_id)
            } else {
                vencedores.push(jogo.time2_id)
            }
        }

        res.status(200).json({ vencedores })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Erro ao verificar vencedores' })
    }
}


exports.chaveamentoSemis = async (req, res) => {
    try {
        const db = await createConnection()

        const [quartas] = await db.query('SELECT * FROM jogos WHERE fase = ?', ['quartas'])
        if (quartas.length !== 4) {
            return res.status(400).json({ message: 'As quartas de final devem ter exatamente 4 jogos' })
        }

        const vencedores = []
        for (const jogo of quartas) {
            if (jogo.gol_time1 > jogo.gol_time2) {
                vencedores.push(jogo.time1_id)
            } else {
                vencedores.push(jogo.time2_id)
            }
        }

        let jogos = []
        while (vencedores.length > 1) {
            const time1 = vencedores.pop()
            const time2 = vencedores.pop()
            jogos.push({ time1_id: time1, time2_id: time2, fase: 'semifinais' })
        }

        res.status(200).json({ jogos })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Erro ao chavear as semifinais' })
    }
}


exports.chaveamentoFinalTerceiro = async (req, res) => {
    try {
        const db = await createConnection()

        const [semis] = await db.query('SELECT * FROM jogos WHERE fase = ?', ['semifinais'])
        if (semis.length !== 2) {
            return res.status(400).json({ message: 'As semifinais devem ter exatamente 2 jogos' })
        }

        const vencedores = []
        const perdedores = []
        for (const jogo of semis) {
            if (jogo.gol_time1 > jogo.gol_time2) {
                vencedores.push(jogo.time1_id)
                perdedores.push(jogo.time2_id)
            } else {
                vencedores.push(jogo.time2_id)
                perdedores.push(jogo.time1_id)
            }
        }

        const final = { time1_id: vencedores[0], time2_id: vencedores[1], fase: 'final' }
        const terceiro_lugar = { time1_id: perdedores[0], time2_id: perdedores[1], fase: 'terceiro_lugar' }

        res.status(200).json({ final, terceiro_lugar })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Erro ao chavear a final e terceiro lugar' })
    }
}
