import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { JWT_CONFIG } from '../config/jwt.js';

const prisma = new PrismaClient();


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

// 
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

const userController = {
  // Listar todos os usuários
  listarTodos: async (req, res) => {
    try {
      const users = await prisma.users.findMany({
        select: {
          id: true,
          nome: true,
          cpf: true,
          login: true
        },
        orderBy: {
          id: 'asc'
        }
      });

      res.json({
        success: true,
        data: users,
        total: users.length
      });
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar usuários',
        error: error.message
      });
    }
  },

  // Buscar usuário por ID
  buscarPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await prisma.users.findUnique({
        where: { id: parseInt(id) },
        select: {
          id: true,
          nome: true,
          cpf: true,
          login: true
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
      console.error('Erro ao buscar usuário:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar usuário',
        error: error.message
      });
    }
  },

  // Criar novo usuário (versão antiga - sem hash)
  criar: async (req, res) => {
    try {
      const { nome, cpf, login, senha } = req.body;

      // Verifica se campos obrigatórios estão presentes
      if (!nome || !cpf || !login || !senha) {
        return res.status(400).json({
          success: false,
          message: 'Nome, CPF, login e senha são obrigatórios'
        });
      }

      const user = await prisma.users.create({
        data: {
          nome,
          cpf,
          login,
          senha
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

      // Verifica se é erro de CPF ou login duplicado
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
  },

  // Atualizar usuário
  atualizar: async (req, res) => {
    try {
      const { id } = req.params;
      const { nome, cpf, login, senha } = req.body;

      const user = await prisma.users.update({
        where: { id: parseInt(id) },
        data: {
          ...(nome && { nome }),
          ...(cpf && { cpf }),
          ...(login && { login }),
          ...(senha && { senha })
        },
        select: {
          id: true,
          nome: true,
          cpf: true,
          login: true
        }
      });

      res.json({
        success: true,
        message: 'Usuário atualizado com sucesso',
        data: user
      });
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);

      if (error.code === 'P2025') {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
      }

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
        message: 'Erro ao atualizar usuário',
        error: error.message
      });
    }
  },

  // Deletar usuário
  deletar: async (req, res) => {
    try {
      const { id } = req.params;

      const user = await prisma.users.delete({
        where: { id: parseInt(id) },
        select: {
          id: true,
          nome: true,
          cpf: true,
          login: true
        }
      });

      res.json({
        success: true,
        message: 'Usuário deletado com sucesso',
        data: user
      });
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);

      if (error.code === 'P2025') {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
      }

      res.status(500).json({
        success: false,
        message: 'Erro ao deletar usuário',
        error: error.message
      });
    }
  },

  // Buscar usuário por CPF
  buscarPorCpf: async (req, res) => {
    try {
      const { cpf } = req.params;
      const user = await prisma.users.findUnique({
        where: { cpf },
        select: {
          id: true,
          nome: true,
          cpf: true,
          login: true
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
      console.error('Erro ao buscar usuário por CPF:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar usuário',
        error: error.message
      });
    }
  },

  // Buscar usuário por login
  buscarPorLogin: async (req, res) => {
    try {
      const { login } = req.params;
      const user = await prisma.users.findUnique({
        where: { login },
        select: {
          id: true,
          nome: true,
          cpf: true,
          login: true
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
      console.error('Erro ao buscar usuário por login:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar usuário',
        error: error.message
      });
    }
  },

  // 🔐 ADICIONE AS NOVAS FUNÇÕES AQUI DENTRO DO userController
  login,
  getMe,
  criarComHash
};

export default userController;