
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import testApi from './routes/teste-api.js';
import testDbRoutes from "./routes/teste-db.js";
import userRoutes from './routes/users.js';
import authRoutes from "./modules/auth/auth.routes.js";
import turistaRoutes from './modules/users/turista/turista.routes.js'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rotas principais
app.use('/api', testApi);
app.use('/testedb', testDbRoutes);
app.use('/users', userRoutes);
app.use('/turistas', turistaRoutes);
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});