# Rentx

API de aluguel de carros, desenvolvida durante o Ignite de NodeJS da Rocketseat.

## Tecnologias 🚀 

- [x] Docker
- [x] Node
- [x] Swagger
- [x] Jest

### Instalando as dependências

```
$ yarn
```
Ou:
```
$ npm install
```
> Foi instalado e configurado o [`eslint`](https://eslint.org/) e [`prettier`](https://prettier.io/) para manter o código limpo e padronizado.

---

### **Configurando Banco de dados**
A aplicação usa dois banco de dados: [Postgres](https://www.postgresql.org/) e [Redis](https://redis.io/). Para a configuração mais rápida é recomendado usar [docker-compose](https://docs.docker.com/compose/), você só precisa fazer o up de todos os serviços:
```
$ docker-compose up -d
```
### Redis
Responsável por armazenar os dados utilizados pelo middleware de _rate limit_. Se, por algum motivo, você quiser criar um contêiner Redis em vez de usar `docker-compose`, poderá fazê-lo executando o seguinte comando:
```
$ docker run --name rentx-redis -d -p 6379:6379 redis:alpine
```

### Postgres
Responsável por armazenar todos os dados do aplicativo. Se por algum motivo você quiser criar um contêiner Postgres em vez de usar `docker-compose`, poderá fazê-lo executando o seguinte comando:
```
$ docker run --name rentx-postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```
> Em seguida no _Postgres_, crie dois bancos de dados: `rentx` e`rentx_test` (no caso de desejar executar os testes).

### Migrations
Lembre se de rodar a migrations:
```
$ yarn ts-node-dev ./node_modules/typeorm/cli.js migration:run
```
Ou:
```
$ yarn typeorm migration:run
```
> Veja mais informações sobre [TypeORM Migrations](https://typeorm.io/#/migrations).

---

## `.env`
Neste arquivo, você deve configurar sua conexão do banco de dados Redis e Postgres, JWT, email, sentry, storage e configurações de AWS (caso seja necessário).
Renomeie o `.env.example` no diretório raiz para `.env` e então atualize com suas configurações.

---

### **Rate Limiter (Opcional)**
O projeto vem pré-configurado, mas você pode ajustá-lo de acordo com suas necessidades.

* `src/shared/infra/http/middlewares/rateLimiter.ts`


> A lib [`rate-limiter-flexible`](https://github.com/animir/node-rate-limiter-flexible) foi usada para configurar os limites da API, para mais detalhes de configuração [clique aqui](https://github.com/animir/node-rate-limiter-flexible/wiki/Options#options).

---

### **Rodando a aplicação**
Para iniciar a aplicação rode o comando abaixo.
```
$ yarn dev:server
```
Ou:
```
npm run dev:server
```

---

### **Rodando os testes**
Usamos o [Jest](https://jestjs.io/) para fazer os testes, para executar:
```
$ yarn test
```
Ou:
```
$ npm run test
```

---

