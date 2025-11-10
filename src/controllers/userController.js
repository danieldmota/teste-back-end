import pool from '../config/db.js';

const userController = {
  // Listar todos os usuários
  listarTodos: async (req, res) => {
    try {
      const result = await pool.query('SELECT id, nome, cpf, login FROM users ORDER BY id');
      res.json({
        success: true,
        data: result.rows,
        total: result.rowCount
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
      const result = await pool.query('SELECT id, nome, cpf, login FROM users WHERE id = $1', [id]);
      
      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
      }

      res.json({
        success: true,
        data: result.rows[0]
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

  // Criar novo usuário
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

      const result = await pool.query(
        'INSERT INTO users (nome, cpf, login, senha) VALUES ($1, $2, $3, $4) RETURNING id, nome, cpf, login',
        [nome, cpf, login, senha]
      );

      res.status(201).json({
        success: true,
        message: 'Usuário criado com sucesso',
        data: result.rows[0]
      });
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      
      // Verifica se é erro de CPF ou login duplicado
      if (error.code === '23505') {
        const constraint = error.constraint;
        if (constraint.includes('cpf')) {
          return res.status(400).json({
            success: false,
            message: 'CPF já está cadastrado'
          });
        } else if (constraint.includes('login')) {
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
      
      // Constrói a query dinamicamente baseada nos campos fornecidos
      let query = 'UPDATE users SET ';
      const fields = [];
      const values = [];
      let paramCount = 1;

      if (nome !== undefined) {
        fields.push(`nome = $${paramCount}`);
        values.push(nome);
        paramCount++;
      }
      if (cpf !== undefined) {
        fields.push(`cpf = $${paramCount}`);
        values.push(cpf);
        paramCount++;
      }
      if (login !== undefined) {
        fields.push(`login = $${paramCount}`);
        values.push(login);
        paramCount++;
      }
      if (senha !== undefined) {
        fields.push(`senha = $${paramCount}`);
        values.push(senha);
        paramCount++;
      }

      if (fields.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Nenhum campo fornecido para atualização'
        });
      }

      values.push(id);
      query += fields.join(', ') + ` WHERE id = $${paramCount} RETURNING id, nome, cpf, login`;

      const result = await pool.query(query, values);

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
      }

      res.json({
        success: true,
        message: 'Usuário atualizado com sucesso',
        data: result.rows[0]
      });
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      
      if (error.code === '23505') {
        const constraint = error.constraint;
        if (constraint.includes('cpf')) {
          return res.status(400).json({
            success: false,
            message: 'CPF já está cadastrado'
          });
        } else if (constraint.includes('login')) {
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
      
      const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id, nome, cpf, login', [id]);

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
      }

      res.json({
        success: true,
        message: 'Usuário deletado com sucesso',
        data: result.rows[0]
      });
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
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
      const result = await pool.query('SELECT id, nome, cpf, login FROM users WHERE cpf = $1', [cpf]);
      
      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
      }

      res.json({
        success: true,
        data: result.rows[0]
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
      const result = await pool.query('SELECT id, nome, cpf, login FROM users WHERE login = $1', [login]);
      
      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
      }

      res.json({
        success: true,
        data: result.rows[0]
      });
    } catch (error) {
      console.error('Erro ao buscar usuário por login:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar usuário',
        error: error.message
      });
    }
  }
};

export default userController;