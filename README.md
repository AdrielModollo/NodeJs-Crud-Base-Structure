# Auth Users

A estrutura está de acordo com os princípios da arquitetura limpa (Clean Architecture) e do Domain-Driven Design (DDD).

A pasta "infra" é responsável por abrigar a infraestrutura do sistema, incluindo a conexão com o banco de dados e os repositórios que lidam com a persistência dos dados. A pasta "interface" contém as interfaces do sistema, como os controladores da camada HTTP e os esquemas de validação. A pasta "middlewares" é onde são armazenados os middlewares do sistema, e a pasta "routes" abriga as rotas do sistema. O arquivo "index.js" é o ponto de entrada da aplicação.

Essa estrutura segue a separação de responsabilidades de forma clara, onde as camadas de baixo nível não dependem das camadas de nível mais alto, e as camadas de nível mais alto não conhecem os detalhes da implementação das camadas de baixo nível. Além disso, é possível aplicar conceitos de DDD, como a definição de domínios e regras de negócio em cada camada.

# Iniciando o projeto

1. npm install

2. docker compose up --build

3. crie um .env e configure seus acessos

4. npm start

Obs: Caso for utilizar com docker não é necessário iniciar a aplicação, apenas utilze a porta "3000" que já está configurada para o docker!

# Rotas configuradas na api

## USERS

    POST: localhost:PORTA/authenticate/register
    POST: localhost:PORTA/authenticate/login
    GET: localhost:PORTA/users/
    PUT: localhost:PORTA/users/:id
    DEL: localhost:PORTA/users/:id
# Users

Você pode criar, atualizar, buscar ou até mesmo deletar os usuários criados na base. Para registrar ou logar com um usuário na base é necessário informar um JWT que será informado no .env. Com o campo "JWT_KEY" preenchido no .env informe no "Headers" em "Key" | Authorization com o valor estabelecido.

# Auth

Em todas as rotas é necessário uma autenticação, utilize a rota: localhost:PORTA/authenticate/login. Recupere o token
gerado e informe em "Headers" > "Key" | Authorization > "Value" | Bearer Token.