import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

// Rota para testar conexão com o banco - Versão Simples
router.get("/", async (req, res) => {
  try {
    const result = await prisma.$queryRaw`SELECT NOW()`;
    
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Status do Banco</title>
        <style>
            body { 
                font-family: Arial, sans-serif; 
                text-align: center; 
                padding: 50px; 
                background: #f5f5f5;
            }
            .success { 
                background: white; 
                padding: 30px; 
                border-radius: 10px; 
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                border-left: 5px solid #28a745;
            }
            .error { 
                background: white; 
                padding: 30px; 
                border-radius: 10px; 
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                border-left: 5px solid #dc3545;
            }
        </style>
    </head>
    <body>
        <div class="success">
            <h1>✅ Conexão OK</h1>
            <p>Banco de dados conectado com sucesso!</p>
            <p><strong>Hora do servidor:</strong> ${new Date(result[0].now).toLocaleString('pt-BR')}</p>
        </div>
    </body>
    </html>
    `;
    
    res.send(html);
    
  } catch (error) {
    console.error("Erro ao conectar ao banco:", error.message);
    
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Erro de Conexão</title>
        <style>
            body { 
                font-family: Arial, sans-serif; 
                text-align: center; 
                padding: 50px; 
                background: #f5f5f5;
            }
            .error { 
                background: white; 
                padding: 30px; 
                border-radius: 10px; 
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                border-left: 5px solid #dc3545;
            }
        </style>
    </head>
    <body>
        <div class="error">
            <h1>❌ Erro de Conexão</h1>
            <p>Falha ao conectar com o banco de dados</p>
            <p><strong>Erro:</strong> ${error.message}</p>
        </div>
    </body>
    </html>
    `;
    
    res.status(500).send(html);
  }
});

export default router;