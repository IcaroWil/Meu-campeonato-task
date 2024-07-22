const createConnection = require('../models/database')

async function inserirTimes(times) {
    const values = times.map(time => [time])

    const db = await createConnection()
    await db.query('DELETE FROM times')
    const [result] = await db.query('INSERT INTO times (nome) VALUES ?', [values])

    if (result.affectedRows === times.length) {
        return { message: 'Times inseridos com sucesso!' }
    } else {
        throw new Error('Erro ao inserir todos os times')
    }
}

async function chaveamentoCampeonato() {
    const db = await createConnection()
    const [times] = await db.query('SELECT * FROM times')

    if (times.length !== 8) {
        throw new Error('O campeonato deve ter exatamente 8 times')
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

    return jogos
}

async function simularJogo(time1_id, time2_id, fase) {
    const db = await createConnection()

    const [time1] = await db.query('SELECT * FROM times WHERE id = ?', [time1_id])
    const [time2] = await db.query('SELECT * FROM times WHERE id = ?', [time2_id])

    const gol_time1 = Math.floor(Math.random() * 8)
    const gol_time2 = Math.floor(Math.random() * 8)

    let pontuacao_time1 = gol_time1 - gol_time2
    let pontuacao_time2 = gol_time2 - gol_time1

    if (gol_time1 === gol_time2) {
        pontuacao_time1 += time1[0].pontuacao
        pontuacao_time2 += time2[0].pontuacao

        if (pontuacao_time1 === pontuacao_time2) {
            if (time1[0].id < time2[0].id) {
                pontuacao_time1++
            } else {
                pontuacao_time2++
            }
        }
    }

    const vencedor = pontuacao_time1 > pontuacao_time2 ? time1_id : time2_id

    const sql = 'INSERT INTO jogos (time1_id, time2_id, gol_time1, gol_time2, fase) VALUES (?, ?, ?, ?, ?)'
    const [result] = await db.query(sql, [time1_id, time2_id, gol_time1, gol_time2, fase])

    await db.query('UPDATE times SET pontuacao = pontuacao + ? WHERE id = ?', [pontuacao_time1, time1_id])
    await db.query('UPDATE times SET pontuacao = pontuacao + ? WHERE id = ?', [pontuacao_time2, time2_id])

    return { message: 'Jogo simulado com sucesso!', gol_time1, gol_time2, vencedor }
}

async function verificarVencedores(fase) {
    const db = await createConnection()
    const [jogos] = await db.query('SELECT * FROM jogos WHERE fase = ?', [fase])

    if (jogos.length === 0) {
        throw new Error('Nenhum jogo encontrado para esta fase')
    }

    const vencedores = await Promise.all(jogos.map(async jogo => {
        if (jogo.gol_time1 > jogo.gol_time2) {
            return jogo.time1_id
        } else if (jogo.gol_time1 < jogo.gol_time2) {
            return jogo.time2_id
        } else {
            const [time1] = await db.query('SELECT * FROM times WHERE id = ?', [jogo.time1_id])
            const [time2] = await db.query('SELECT * FROM times WHERE id = ?', [jogo.time2_id])

            if (time1[0].pontuacao > time2[0].pontuacao) {
                return time1[0].id
            } else if (time1[0].pontuacao < time2[0].pontuacao) {
                return time2[0].id
            } else {
                return time1[0].id < time2[0].id ? time1[0].id : time2[0].id
            }
        }
    }))

    const uniqueVencedores = [...new Set(vencedores)]

    if (fase === 'semi' && uniqueVencedores.length !== 2) {
        throw new Error('As semifinais devem ter exatamente 2 vencedores')
    }

    return uniqueVencedores
}

async function chaveamentoSemis() {
    const db = await createConnection()
    const vencedores = await verificarVencedores('quartas')

    if (vencedores.length !== 4) {
        throw new Error('As quartas de final devem ter exatamente 4 vencedores')
    }

    const shuffle = array => array.sort(() => Math.random() - 0.5)
    const timesRestantes = shuffle(vencedores.slice())

    const semiJogos = []
    while (timesRestantes.length > 1) {
        const time1 = timesRestantes.pop()
        const time2 = timesRestantes.pop()
        semiJogos.push({ time1_id: time1, time2_id: time2, fase: 'semi' })
    }

    await Promise.all(semiJogos.map(async jogo => {
        await db.query('INSERT INTO jogos (time1_id, time2_id, fase) VALUES (?, ?, ?)', [jogo.time1_id, jogo.time2_id, 'semi'])
    }))

    return semiJogos
}

async function chaveamentoFinalTerceiro() {
    const db = await createConnection()
    const vencedores = await verificarVencedores('semi')

    if (vencedores.length !== 2) {
        throw new Error('As semifinais devem ter exatamente 2 vencedores')
    }

    const [semis] = await db.query('SELECT * FROM jogos WHERE fase = "semi" AND gol_time1 IS NOT NULL AND gol_time2 IS NOT NULL')

    
    const jogosUnicos = {}
    semis.forEach(jogo => {
        const chave = `${jogo.time1_id}-${jogo.time2_id}`
        if (!jogosUnicos[chave]) {
            jogosUnicos[chave] = jogo
        }
    })

    const jogosValidos = Object.values(jogosUnicos)

    const perdedores = jogosValidos.map(jogo => {
        if (jogo.gol_time1 > jogo.gol_time2) {
            return jogo.time2_id
        } else {
            return jogo.time1_id
        }
    })

    console.log('Jogos válidos:', jogosValidos)
    console.log('Perdedores:', perdedores)

    if (perdedores.length !== 2) {
        throw new Error('As semifinais devem ter exatamente 2 perdedores')
    }

    const jogos = [
        { time1_id: vencedores[0], time2_id: vencedores[1], fase: 'final' },
        { time1_id: perdedores[0], time2_id: perdedores[1], fase: 'terceiro' }
    ]

    await Promise.all(jogos.map(async jogo => {
        await db.query('INSERT INTO jogos (time1_id, time2_id, fase) VALUES (?, ?, ?)', [jogo.time1_id, jogo.time2_id, jogo.fase])
    }))

    return jogos
}

async function recuperarCampeonatosAnteriores() {
    const db = await createConnection()
    const [jogos] = await db.query('SELECT * FROM jogos WHERE gol_time1 IS NOT NULL AND gol_time2 IS NOT NULL')

    if (jogos.length === 0) {
        throw new Error('Nenhum jogo encontrado')
    }

    const campeonatosAnteriores = {
        quartas: [],
        semi: [],
        final: [],
        terceiro: []
    }

    jogos.forEach(jogo => {
        campeonatosAnteriores[jogo.fase].push(jogo)
    })

    return campeonatosAnteriores
}

module.exports = {
    inserirTimes,
    chaveamentoCampeonato,
    simularJogo,
    verificarVencedores,
    chaveamentoSemis,
    chaveamentoFinalTerceiro,
    recuperarCampeonatosAnteriores
}
