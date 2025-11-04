# 🚀 Estrutura Base Node.js + Express

Este projeto foi criado como estrutura inicial para aplicações backend usando **Node.js** e **Express.js**, com suporte a variáveis de ambiente via **dotenv** e controle de acesso via **CORS**.

## 📂 Estrutura de Pastas

teste-back-end/
│
├── node_modules
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── config/
│   ├── middlewares/
│   └── server.js
├── .env
├── .gitignore
├── package.json
└── README.md

## ⚙️ Tecnologias Utilizadas

- [Node.js](https://nodejs.org/pt)
- [Express.js](https://expressjs.com/pt-br/)
- [dotenv](https://github.com/motdotla/dotenv)
- [CORS](https://expressjs.com/en/resources/middleware/cors.html)
- [Nodemon](https://www.npmjs.com/package/nodemon)

---

## 🧩 Instalação

1. **Clone o repositório**
   git clone https://github.com/seu-usuario/meu-projeto.git
   cd meu-projeto

2. **Instale as dependências**
   npm install

3. **Configure o arquivo `.env`**
   PORT=3000

---

## ▶️ Executando o Servidor

### Ambiente de Desenvolvimento

npm run dev

### Produção

npm start

Acesse a API em:
👉 [http://localhost:3000/api](http://localhost:3000/api)

---

## 🧠 Explicação dos Principais Arquivos

| Arquivo                                | Função                                                            |
| -------------------------------------- | ----------------------------------------------------------------- |
| `src/server.js`                        | Inicia o servidor Express, configura CORS e variáveis de ambiente |
| `src/routes/index.js`                  | Define as rotas principais da aplicação                           |
| `src/controllers/exemploController.js` | Controla a lógica das requisições da rota de exemplo              |
| `.env`                                 | Armazena variáveis de ambiente (porta, senhas, etc)               |
| `package.json`                         | Define dependências e scripts do projeto                          |

---

## 🌍 Endpoints de Exemplo

| Método | Rota           | Descrição                                    |
| ------ | -------------- | -------------------------------------------- |
| GET    | `/api`         | Retorna mensagem de status da API            |
| GET    | `/api/exemplo` | Exemplo de rota controlada por um controller |

---

## 🔐 Segurança e Boas Práticas

* **Nunca** envie o arquivo `.env` para o GitHub.
* Use `process.env` para acessar variáveis sensíveis.
* Restrinja domínios no CORS em produção:

  app.use(cors({ origin: 'https://seu-dominio.com' }));