# 🚀 API Node.js + Express + PostgreSQL com Docker

Este projeto é um exemplo de estrutura backend moderna, utilizando **Node.js**, **Express**, **PostgreSQL** e **Docker Compose** para gerenciar os ambientes de desenvolvimento de forma simples e consistente.  
Com suporte a variáveis de ambiente via **dotenv** e controle de acesso via **CORS**.

---

## 🧩 Tecnologias utilizadas

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [cors](https://www.npmjs.com/package/cors)

---

## 🧠 Pré-requisitos

Antes de rodar o projeto, instale:

- **Docker Desktop** (ou Docker Engine)  
- **Git**

> ⚠️ Você **não precisa instalar Node.js ou PostgreSQL localmente** — o Docker cuida de tudo.

---

## 🧰 Configuração do ambiente

1. **Clone o repositório**
   ```bash
   git clone https://github.com/danieldmota/teste-back-end.git
   cd teste-back-end

2. **Crie o arquivo `.env`**
   O `.env` não vai para o Git, então crie um novo com o conteúdo abaixo (usando o link do banco online):

   ```
   DATABASE_URL=postgresql://usuario:senha@host:porta/database
   PORT=3000
   ```

---

## 🐳 Rodando o projeto com Docker

### 1️⃣ Subir o ambiente

```bash
docker compose up -d
```

Isso fará o Docker:

* Baixar as imagens necessárias (Node, etc)
* Construir a imagem do app (`teste-back-end`)
* Criar e iniciar o container

---

### 2️⃣ Verificar se está rodando

```bash
docker ps
```

Saída esperada:

```
CONTAINER ID   IMAGE               STATUS          PORTS
xxxxxx         teste-back-end  Up 2 minutes    0.0.0.0:3000->3000/tcp
```

A API estará disponível em:
👉 **[http://localhost:3000](http://localhost:3000)**

---

### 3️⃣ Parar o container

Quando terminar o trabalho:

```bash
docker compose down
```

Isso **para e remove o container**, mas **mantém as imagens e volumes**.

---

### 4️⃣ Reconstruir o container (após alterações no Dockerfile, docker-compose ou .dockerignore)

```bash
docker compose build --no-cache
docker compose up -d
```

---

## 📁 .dockerignore

O arquivo `.dockerignore` evita que o Docker envie arquivos desnecessários para o build da imagem.

Exemplo:

```
node_modules
npm-debug.log
.env
.git
.gitignore
Dockerfile
docker-compose.yml
README.md
```

---

## 🧪 Testar a conexão com o banco

Rota de teste criada no arquivo `src/routes/teste-db.js`:

```bash
GET /testedb
```

Se retornar `Conectado ao PostgreSQL!`, a conexão está funcionando 🎯

---

## 🧹 Limpeza opcional

Para limpar containers e imagens antigas (sem apagar volumes):

```bash
docker system prune -f
```

---

## 🔐 Segurança e Boas Práticas

* **Nunca** envie o arquivo `.env` para o GitHub.

---

## 🌍 Endpoints de Exemplo

| Método | Rota           | Descrição                                    |
| ------ | -------------- | -------------------------------------------- |
| GET    | `/api`         | Retorna mensagem de status da API            |
| GET    | `/api/exemplo` | Exemplo de rota controlada por um controller |
| GET    | `/testedb` | Retorna se a conexão foi feita com sucesso |

---