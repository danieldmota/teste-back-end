### **1. PRIMEIRO: ENTENDA O BÁSICO DO JWT**

**JWT (JSON Web Token)** é como um "cartão de acesso" digital:
- ✅ **Login** → Gera um token
- ✅ **Requests** → Envia o token no header
- ✅ **Verificação** → API valida se o token é válido

### **2. INSTALE AS DEPENDÊNCIAS NECESSÁRIAS**

```bash
npm install jsonwebtoken bcryptjs
```

**O que cada um faz:**
- `jsonwebtoken`: Gera e verifica tokens JWT
- `bcryptjs`: Criptografa senhas (mais seguro)

### **3. CONFIGURAÇÃO INICIAL - CRIE OS ARQUIVOS**

**Arquivo:** `src/config/jwt.js`
```javascript
export const JWT_CONFIG = {
  secret: process.env.JWT_SECRET || 'seuSegredoSuperSecretoAqui',
  expiresIn: '24h' // Token expira em 24 horas
};
```

**Arquivo:** `.env` (ADICIONE esta linha)
```env
DATABASE_URL=postgresql://neondb_owner:npg_x8DilAcZu4rW@ep-restless-snow-aha1hcp9-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
PORT=3000
JWT_SECRET=seuSegredoMuitoSecretoAquiMudeIsso
```

### **4. MIDDLEWARE DE AUTENTICAÇÃO**

**Arquivo:** `src/middleware/auth.js`
```javascript
import jwt from 'jsonwebtoken';
import { JWT_CONFIG } from '../config/jwt.js';

export const authMiddleware = (req, res, next) => {
  try {
    // Pega o token do header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token de acesso não fornecido'
      });
    }

    // Verifica se o token é válido
    const decoded = jwt.verify(token, JWT_CONFIG.secret);
    
    // Adiciona os dados do usuário na request
    req.user = decoded;
    
    next(); // Continua para a próxima função
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token inválido ou expirado'
    });
  }
};
```

### **5. ATUALIZE O CONTROLLER DE USUÁRIOS**

**Arquivo:** `src/controllers/userController.js` (ADICIONE estas funções):

```javascript
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { JWT_CONFIG } from '../config/jwt.js';

const prisma = new PrismaClient();

// ... suas funções existentes ...

// 🔐 NOVA FUNÇÃO: LOGIN
const login = async (req, res) => {
  try {
    const { login, senha } = req.body;

    // Validação básica
    if (!login || !senha) {
      return res.status(400).json({
        success: false,
        message: 'Login e senha são obrigatórios'
      });
    }

    // Busca usuário pelo login
    const user = await prisma.users.findUnique({
      where: { login }
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Credenciais inválidas'
      });
    }

    // 🔒 COMPARA SENHA (sem bcrypt por enquanto - versão simples)
    if (user.senha !== senha) {
      return res.status(401).json({
        success: false,
        message: 'Credenciais inválidas'
      });
    }

    // 🎫 GERA TOKEN JWT
    const token = jwt.sign(
      { 
        id: user.id, 
        nome: user.nome, 
        login: user.login 
      },
      JWT_CONFIG.secret,
      { expiresIn: JWT_CONFIG.expiresIn }
    );

    // ✅ RETORNA SUCESSO
    res.json({
      success: true,
      message: 'Login realizado com sucesso',
      data: {
        user: {
          id: user.id,
          nome: user.nome,
          login: user.login
        },
        token
      }
    });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao realizar login',
      error: error.message
    });
  }
};

// 🔐 NOVA FUNÇÃO: VERIFICAR TOKEN (MEU PERFIL)
const getMe = async (req, res) => {
  try {
    // O middleware authMiddleware já adicionou req.user
    const user = await prisma.users.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        nome: true,
        cpf: true,
        login: true,
        criadoEm: true
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    res.json({
      success: true,
      data: user
    });

  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar perfil',
      error: error.message
    });
  }
};

// 🔐 ADICIONE CRIAÇÃO DE USUÁRIO COM SENHA CRIPTOGRAFADA
const criarComHash = async (req, res) => {
  try {
    const { nome, cpf, login, senha } = req.body;
    
    if (!nome || !cpf || !login || !senha) {
      return res.status(400).json({
        success: false,
        message: 'Nome, CPF, login e senha são obrigatórios'
      });
    }

    // 🔒 CRIPTOGRAFA SENHA
    const senhaHash = await bcrypt.hash(senha, 10);

    const user = await prisma.users.create({
      data: {
        nome,
        cpf,
        login,
        senha: senhaHash // Agora salva a senha criptografada
      },
      select: {
        id: true,
        nome: true,
        cpf: true,
        login: true
      }
    });

    res.status(201).json({
      success: true,
      message: 'Usuário criado com sucesso',
      data: user
    });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    
    if (error.code === 'P2002') {
      const field = error.meta?.target?.[0];
      if (field === 'cpf') {
        return res.status(400).json({
          success: false,
          message: 'CPF já está cadastrado'
        });
      } else if (field === 'login') {
        return res.status(400).json({
          success: false,
          message: 'Login já está em uso'
        });
      }
    }

    res.status(500).json({
      success: false,
      message: 'Erro ao criar usuário',
      error: error.message
    });
  }
};

// EXPORTE AS NOVAS FUNÇÕES
export default {
  ...userController, // Mantém todas as funções antigas
  login,
  getMe,
  criarComHash
};
```

### **6. ATUALIZE AS ROTAS**

**Arquivo:** `src/routes/users.js`
```javascript
import { Router } from 'express';
import userController from '../controllers/userController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// 🔓 ROTAS PÚBLICAS
router.post('/login', userController.login);
router.post('/register', userController.criarComHash);

// 🔐 ROTAS PROTEGIDAS (precisam de token)
router.get('/me', authMiddleware, userController.getMe);
router.put('/me', authMiddleware, userController.atualizar);

// 📋 ROTAS EXISTENTES (mantém como estão)
router.get('/', userController.listarTodos);
router.get('/cpf/:cpf', userController.buscarPorCpf);     
router.get('/login/:login', userController.buscarPorLogin); 
router.get('/:id', userController.buscarPorId);
router.post('/', userController.criarComHash); // Agora usa a versão com hash
router.put('/:id', userController.atualizar);
router.delete('/:id', userController.deletar);

export default router;
```

### **7. TESTE A IMPLEMENTAÇÃO**

**Passo 1:** Recrie o container
```bash
docker compose down
docker compose up -d
```

**Passo 2:** Teste o cadastro (com senha criptografada)
```bash
# POST para http://localhost:3000/users/register
{
  "nome": "João Silva",
  "cpf": "123.456.789-00", 
  "login": "joao",
  "senha": "minhasenha123"
}
```

**Passo 3:** Teste o login
```bash
# POST para http://localhost:3000/users/login
{
  "login": "joao",
  "senha": "minhasenha123"
}
```

**Resposta esperada:**
```json
{
  "success": true,
  "message": "Login realizado com sucesso", 
  "data": {
    "user": {
      "id": 1,
      "nome": "João Silva",
      "login": "joao"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Passo 4:** Teste rota protegida
```bash
# GET para http://localhost:3000/users/me
# Headers: Authorization: Bearer SEU_TOKEN_AQUI
```

## 🎯 **RESUMO DOS ENDPOINTS NOVOS:**

| Método | Rota | Descrição | Acesso |
|--------|------|------------|---------|
| POST | `/users/login` | Fazer login | Público |
| POST | `/users/register` | Cadastrar usuário | Público |
| GET | `/users/me` | Meu perfil | Token |
| PUT | `/users/me` | Editar meu perfil | Token |

## 🚀 **PRÓXIMOS PASSOS (QUANDO ESTIVER FUNCIONANDO):**

1. **Implementar logout** (apagar token do frontend)
2. **Refresh tokens** para manter usuário logado
3. **Proteger mais rotas** com o middleware
4. **Adicionar roles** (admin, user, etc.)

## 💡 **DICA IMPORTANTE:**

Sempre teste **passo a passo**:
1. Primeiro o cadastro ✅
2. Depois o login ✅  
3. Por último as rotas protegidas ✅

