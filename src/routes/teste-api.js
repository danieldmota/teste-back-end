import { Router } from 'express';
import exemploController from '../controllers/exemploController.js';

const router = Router();

// Rota principal com dashboard HTML
router.get('/', (req, res) => {
  const html = `
  <!DOCTYPE html>
  <html lang="pt-BR">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>SeACHA API - Sistema de Turismo</title>
      <style>
          * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
          }
          
          body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 20px;
          }
          
          .container {
              background: rgba(255, 255, 255, 0.95);
              backdrop-filter: blur(10px);
              padding: 3rem;
              border-radius: 20px;
              box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
              text-align: center;
              max-width: 800px;
              width: 100%;
              border: 1px solid rgba(255, 255, 255, 0.2);
          }
          
          .logo {
              font-size: 3.5rem;
              margin-bottom: 1rem;
          }
          
          h1 {
              color: #2d3748;
              font-size: 2.5rem;
              margin-bottom: 0.5rem;
              font-weight: 700;
          }
          
          .subtitle {
              color: #4a5568;
              font-size: 1.2rem;
              margin-bottom: 2rem;
          }
          
          .status-badge {
              display: inline-block;
              background: #48bb78;
              color: white;
              padding: 0.5rem 1.5rem;
              border-radius: 50px;
              font-weight: 600;
              margin-bottom: 2rem;
              box-shadow: 0 4px 15px rgba(72, 187, 120, 0.3);
          }
          
          .features {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
              gap: 1.5rem;
              margin: 2rem 0;
          }
          
          .feature-card {
              background: white;
              padding: 1.5rem;
              border-radius: 12px;
              box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
              border-left: 4px solid #667eea;
              transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          
          .feature-card:hover {
              transform: translateY(-5px);
              box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          }
          
          .feature-icon {
              font-size: 2rem;
              margin-bottom: 1rem;
          }
          
          .endpoints {
              background: #f7fafc;
              padding: 2rem;
              border-radius: 12px;
              margin: 2rem 0;
              text-align: left;
          }
          
          .endpoint {
              background: white;
              padding: 1rem;
              margin: 0.5rem 0;
              border-radius: 8px;
              border-left: 4px solid #4299e1;
              font-family: 'Monaco', 'Consolas', monospace;
              display: flex;
              justify-content: space-between;
              align-items: center;
          }
          
          .method {
              background: #4299e1;
              color: white;
              padding: 0.25rem 0.75rem;
              border-radius: 4px;
              font-size: 0.8rem;
              font-weight: bold;
          }
          
          .method.get { background: #48bb78; }
          .method.post { background: #ed8936; }
          .method.put { background: #ed64a6; }
          .method.delete { background: #e53e3e; }
          
          .next-steps {
              background: #fffaf0;
              border: 2px dashed #ed8936;
              padding: 1.5rem;
              border-radius: 12px;
              margin-top: 2rem;
          }
          
          .next-steps h3 {
              color: #dd6b20;
              margin-bottom: 1rem;
          }
          
          .tech-stack {
              display: flex;
              justify-content: center;
              gap: 1rem;
              margin: 1.5rem 0;
              flex-wrap: wrap;
          }
          
          .tech-badge {
              background: #e2e8f0;
              padding: 0.5rem 1rem;
              border-radius: 20px;
              font-size: 0.9rem;
              color: #4a5568;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="logo">🏔️</div>
          <h1>SeAcha API</h1>
          <p class="subtitle">Sistema de Gestão de Pontos Turísticos e Eventos</p>
          
          <div class="status-badge">
              ✅ API ONLINE & FUNCIONANDO
          </div>
          
          <div class="tech-stack">
              <span class="tech-badge">Node.js</span>
              <span class="tech-badge">Express</span>
              <span class="tech-badge">PostgreSQL</span>
              <span class="tech-badge">Prisma</span>
              <span class="tech-badge">JWT</span>
          </div>
          
          <div class="features">
              <div class="feature-card">
                  <div class="feature-icon">👥</div>
                  <h3>Gestão de Usuários</h3>
                  <p>Turistas, Empreendedores e Administradores</p>
              </div>
             
          <div style="margin-top: 2rem; color: #718096; font-size: 0.9rem;">
              <p>📅 ${new Date().toLocaleDateString('pt-BR')} - 🕒 ${new Date().toLocaleTimeString('pt-BR')}</p>
          </div>
      </div>
  </body>
  </html>
  `;
  
  res.send(html);
});

router.get('/exemplo', exemploController.listar);

export default router;