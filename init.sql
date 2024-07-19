CREATE DATABASE IF NOT EXISTS meu_campeonato;

USE meu_campeonato;

CREATE TABLE IF NOT EXISTS times (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  pontuacao INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS jogos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  time1_id INT,
  time2_id INT,
  gol_time1 INT,
  gol_time2 INT,
  fase VARCHAR(50),
  FOREIGN KEY (time1_id) REFERENCES times(id),
  FOREIGN KEY (time2_id) REFERENCES times(id)
);
