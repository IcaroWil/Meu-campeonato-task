const { response } = require('express')
const db = require('../models/db')


exports.inserirTimes = (req, res) => {
    const { times } = req.body
    if (times.length !== 8) {
        return res.status(400).json({ message: 'Devem ser inseridos exatamente 8 times' })
    }

    const values = times.map(time => [time])

    db.query('INSERT INTO times (nome) VALUES ?', [values], (err, result) => {
        if (err) throw err
        res.status(201).json({ message: 'Times inseridos com sucesso!' })
    })
}

exports.simularJogo = (req, res) => {
    const { time1_id, time2_id, fase } = req.body

    const gol_time1 = Math.floor(Math.random() * 8)
    const gol_time2 = Math.floor(Math.random() * 8)

    const sql = 'INSERT INTO jogos (time1_id, time2_id, gol_time1, gol_time2, fase) VALUES (?, ?, ?, ?, ?)'
    db.query(sql, [time1_id, time2_id, gol_time1, gol_time2, fase], (err, result) => {
        if (err) throw err

        db.query('UPDATE times SET pontuacao = pontuacao + ? WHERE id = ?', [gol_time1, time1_id])
        db.query('UPDATE times SET pontuacao = pontuacao + ? WHERE id = ?', [gol_time2, time2_id])

        res.status(201).json({ message: 'Jogo simulado com sucesso!', gol_time1, gol_time2 })
    })
}
