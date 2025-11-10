import pool from '../config/db.js';

const userController = {
  // Listar todos os usuários
  listarTodos: async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM usuarios');
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
      const result = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
      
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
      const { nome, email, telefone } = req.body;
      
      const result = await pool.query(
        'INSERT INTO usuarios (nome, email, telefone) VALUES ($1, $2, $3) RETURNING *',
        [nome, email, telefone]
      );

      res.status(201).json({
        success: true,
        message: 'Usuário criado com sucesso',
        data: result.rows[0]
      });
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
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
      const { nome, email, telefone } = req.body;
      
      const result = await pool.query(
        'UPDATE usuarios SET nome = $1, email = $2, telefone = $3 WHERE id = $4 RETURNING *',
        [nome, email, telefone, id]
      );

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
      
      const result = await pool.query('DELETE FROM usuarios WHERE id = $1 RETURNING *', [id]);

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
  }
};

export default userController;