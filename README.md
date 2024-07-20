# Meu Campeonato

## Descrição

Bem-vindo ao projeto "Placar do Jogo"! Este é um teste técnico para back-end, desenvolvido para simular campeonatos de futebol. A aplicação é feita utilizando Node.js e MySQL, e tem como objetivo principal oferecer uma solução simples e eficaz para gerenciar torneios eliminatórios.

## Tecnologias Utilizadas

- **Node.js**: Plataforma de desenvolvimento back-end.
- **Express**: Framework web para Node.js.
- **MySQL**: Sistema de gerenciamento de banco de dados relacional.
- **Docker**: Ferramenta de containerização para criar ambientes isolados.
- **Docker Compose**: Orquestração de containers Docker.

## Como Executar o Projeto

### Pré-requisitos

Antes de começar, você precisará ter o Docker e o Docker Compose instalados em sua máquina. Além disso, o Node.js deve estar instalado para executar comandos npm.

### Passo a Passo

1. **Clone o repositório**:

    ```bash
    git clone https://github.com/IcaroWil/Meu-campeonato-task.git
    cd Meu-campeonato-task
    ```

2. **Instale as dependências do projeto**:

    ```bash
    npm install
    ```

3. **Configure o ambiente e inicialize os containers Docker**:

    ```bash
    docker-compose up -d
    ```

    Isso irá configurar e iniciar a aplicação e o banco de dados MySQL.

4. **Inicie a aplicação**:

    A aplicação já estará em execução após a configuração dos containers, e você poderá acessá-la na porta 3000.

### Banco de Dados

O banco de dados será inicializado automaticamente com o script `init.sql`, criando as tabelas necessárias (`times` e `jogos`). Certifique-se de que o banco de dados está corretamente configurado e acessível.

## Conclusão

Este projeto foi desenvolvido com o objetivo de criar uma aplicação funcional e bem estruturada para simular campeonatos de futebol. Agradecemos pelo interesse e esperamos que você goste de explorar e utilizar o "Placar do Jogo".

Para mais detalhes, visite o repositório no GitHub: [Meu Campeonato Task](https://github.com/IcaroWil/Meu-campeonato-task).

---

Desenvolvido por [IcaroWil](https://github.com/IcaroWil)
