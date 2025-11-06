import express from "express";
import pool from "../config/db.js"; // <-- Certifique-se de ter o arquivo db.js configurado

const router = express.Router();

// Rota para testar conexão com o banco
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      status: "Conectado ao PostgreSQL!",
      hora_servidor: result.rows[0].now,
    });
  } catch (error) {
    console.error("Erro ao conectar ao banco:", error.message);
    res.status(500).json({
      status: "Erro na conexão com o banco",
      detalhe: error.message,
    });
  }
});

export default router;
