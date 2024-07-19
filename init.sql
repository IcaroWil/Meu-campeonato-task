CREATE TABLE IF NOT EXISTS times (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    pontuacao INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS jogos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    time1_id INT NOT NULL,
    time2_id INT NOT NULL,
    gol_time1 INT NOT NULL,
    gol_time2 INT NOT NULL,
    fase VARCHAR(50) NOT NULL,
    FOREIGN KEY (time1_id) REFERENCES times(id),
    FOREIGN KEY (time2_id) REFERENCES times(id)
);
