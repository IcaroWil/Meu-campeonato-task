# Meu campeonato

## Descrição

Projeto "Meu campeonato"! Este é um teste técnico para back-end, desenvolvido para simular campeonatos de futebol. A aplicação é feita utilizando Node.js e MySQL, e tem como objetivo principal oferecer uma solução simples e eficaz para gerenciar torneios eliminatórios.

## Tecnologias Utilizadas

- **Node.js**: Plataforma de desenvolvimento back-end.
- **Express**: Framework web para Node.js.
- **MySQL**: Sistema de gerenciamento de banco de dados relacional.
- **Docker**: Ferramenta de containerização para criar ambientes isolados.
- **Docker Compose**: Orquestração de containers Docker.
- **Postman**: Utilizado para testar e documentar a API.

## Como Executar o Projeto

### Pré-requisitos

Antes de começar, você precisará ter o Docker e o Docker Compose instalados em sua máquina.

### Passo a Passo

1. **Clone o repositório**:

    ```bash
    git clone https://github.com/IcaroWil/Meu-campeonato-task.git
    cd Task-Irroba
    ```

2. **Configure o ambiente e inicialize os containers Docker**:

    ```bash
    docker-compose up --build
    ```

    Isso irá configurar e iniciar a aplicação e o banco de dados MySQL.

3. **Acesse a aplicação**:

    A aplicação estará em execução após a configuração dos containers, e você poderá acessá-la na porta 3000.

## Endpoints da API

### Inserir Times

- **Rota:** `POST /inserir-times`
- **Descrição:** Insere exatamente 8 times no campeonato.
- **Corpo da Requisição:** `times` (array de nomes dos times).

### Chaveamento do Campeonato

- **Rota:** `GET /chaveamento`
- **Descrição:** Retorna o chaveamento inicial das quartas de final.

### Simular Jogo

- **Rota:** `POST /simular-jogo`
- **Descrição:** Simula um jogo entre dois times.
- **Corpo da Requisição:** `time1_id`, `time2_id`, `fase`.

### Verificar Vencedores

- **Rota:** `GET /verificar-vencedores/:fase`
- **Descrição:** Verifica os vencedores de uma fase específica.
- **Parâmetro:** `fase` - A fase do campeonato (quartas, semifinais, final, terceiro_lugar).

### Chaveamento das Semifinais

- **Rota:** `GET /chaveamento-semis`
- **Descrição:** Retorna o chaveamento das semifinais.

### Chaveamento da Final e Terceiro Lugar

- **Rota:** `GET /chaveamento-final-terceiro`
- **Descrição:** Retorna o chaveamento da final e do terceiro lugar.

### Recuperar Campeonatos Anteriores

- **Rota:** `GET /recuperar-campeonatos-anteriores`
- **Descrição:** Recupera os resultados de campeonatos anteriores.

## Como Funciona

1. **Inserir Times:** Primeiramente, insira exatamente 8 times usando o endpoint `/inserir-times`.
2. **Chaveamento:** Obtenha o chaveamento inicial das quartas de final com o endpoint `/chaveamento`.
3. **Simular Jogos:** Use o endpoint `/simular-jogo` para simular cada jogo das quartas, semifinais, final e disputa de terceiro lugar.
4. **Verificar Vencedores:** Verifique os vencedores de cada fase usando o endpoint `/verificar-vencedores/:fase`.
5. **Chaveamento das Semis e Final:** Obtenha os chaveamentos das semifinais e da final/terceiro lugar usando os endpoints `/chaveamento-semis` e `/chaveamento-final-terceiro`, respectivamente.
6. **Recuperar Campeonatos Anteriores:** Recupere os resultados de campeonatos anteriores usando o endpoint `/recuperar-campeonatos-anteriores`.

## Conclusão

Este projeto foi desenvolvido com o objetivo de criar uma aplicação funcional e bem estruturada para simular campeonatos de futebol. Agradeço pelo interesse e espero que você goste de explorar e utilizar o "Meu campeonato".

Para mais detalhes, visite o repositório no GitHub: [Meu-campeonato-task](https://github.com/IcaroWil/Meu-campeonato-task.git).

---

Desenvolvido por [IcaroWil](https://github.com/IcaroWil).