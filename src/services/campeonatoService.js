const createConnection = require('../models/db')

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
    const gol_time1 = Math.floor(Math.random() * 8)
    const gol_time2 = Math.floor(Math.random() * 8)

    const sql = 'INSERT INTO jogos (time1_id, time2_id, gol_time1, gol_time2, fase) VALUES (?, ?, ?, ?, ?)'
    const db = await createConnection()
    const [result] = await db.query(sql, [time1_id, time2_id, gol_time1, gol_time2, fase])

    return { message: 'Jogo simulado com sucesso!', gol_time1, gol_time2 }
}

async function verificarVencedores(fase) {
    const db = await createConnection()
    const [jogos] = await db.query('SELECT * FROM jogos WHERE fase = ?', [fase])

    if (jogos.length === 0) {
        throw new Error('Nenhum jogo encontrado para esta fase')
    }

    const vencedores = jogos.map(jogo => {
        return jogo.gol_time1 > jogo.gol_time2 ? jogo.time1_id : jogo.time2_id
    })

    return vencedores
}

async function chaveamentoSemis() {
    const db = await createConnection()
    const [quartas] = await db.query('SELECT * FROM jogos WHERE fase = ?', ['quartas'])

    if (quartas.length !== 4) {
        throw new Error('As quartas de final devem ter exatamente 4 jogos')
    }

    const vencedores = quartas.map(jogo => {
        return jogo.gol_time1 > jogo.gol_time2 ? jogo.time1_id : jogo.time2_id
    })

    let jogos = []
    while (vencedores.length > 1) {
        const time1 = vencedores.pop()
        const time2 = vencedores.pop()
        jogos.push({ time1_id: time1, time2_id: time2, fase: 'semifinais' })
    }

    return jogos
}

async function chaveamentoFinalTerceiro() {
    const db = await createConnection()
    const [semis] = await db.query('SELECT * FROM jogos WHERE fase = ?', ['semifinais'])

    if (semis.length !== 2) {
        throw new Error('As semifinais devem ter exatamente 2 jogos')
    }

    const vencedores = []
    const perdedores = []
    semis.forEach(jogo => {
        if (jogo.gol_time1 > jogo.gol_time2) {
            vencedores.push(jogo.time1_id)
            perdedores.push(jogo.time2_id)
        } else {
            vencedores.push(jogo.time2_id)
            perdedores.push(jogo.time1_id)
        }
    })

    const final = { time1_id: vencedores[0], time2_id: vencedores[1], fase: 'final' }
    const terceiro_lugar = { time1_id: perdedores[0], time2_id: perdedores[1], fase: 'terceiro_lugar' }

    return { final, terceiro_lugar }
}

async function recuperarCampeonatosAnteriores() {
    const db = await createConnection()
    const [jogos] = await db.query('SELECT * FROM jogos')

    if (jogos.length === 0) {
        throw new Error('Nenhum campeonato encontrado')
    }

    return jogos
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
