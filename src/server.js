import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import testApi from './routes/teste-api.js';
import testDbRoutes from "./routes/teste-db.js";

// Importação das rotas específicas
import us from './routes/users.js';  // Importe a rota '/users' de algum arquivo de rotas

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rotas principais
app.use('/api', testApi);
app.use('/testedb', testDbRoutes);

// Definindo a rota /users
app.get('/users', us);  // Ou app.use('/users', us), se us for um middleware

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
