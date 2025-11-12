import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const turistaController = {
  // Listar todos os turistas
  listarTodos: async (req, res) => {
    try {
      const turistas = await prisma.turista.findMany({
        orderBy: {
          id: 'asc'
        }
      });
      
      res.json({
        success: true,
        data: turistas,
        total: turistas.length
      });
    } catch (error) {
      console.error('Erro ao buscar turistas:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar turistas',
        error: error.message
      });
    }
  },

  // Buscar turista por ID
  buscarPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const turista = await prisma.turista.findUnique({
        where: { id: parseInt(id) }
      });
      
      if (!turista) {
        return res.status(404).json({
          success: false,
          message: 'Turista não encontrado'
        });
      }

      res.json({
        success: true,
        data: turista
      });
    } catch (error) {
      console.error('Erro ao buscar turista:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar turista',
        error: error.message
      });
    }
  },

  // Criar novo turista
  criar: async (req, res) => {
    try {
      const { cidade, estado, pais, usuarioId } = req.body;
      
      const turista = await prisma.turista.create({
        data: {
          cidade,
          estado,
          pais,
          usuarioId: parseInt(usuarioId)
        }
      });

      res.status(201).json({
        success: true,
        message: 'Turista criado com sucesso',
        data: turista
      });
    } catch (error) {
      console.error('Erro ao criar turista:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao criar turista',
        error: error.message
      });
    }
  },

  // Atualizar turista
  atualizar: async (req, res) => {
    try {
      const { id } = req.params;
      const { cidade, estado, pais, usuarioId } = req.body;
      
      const turista = await prisma.turista.update({
        where: { id: parseInt(id) },
        data: {
          ...(cidade && { cidade }),
          ...(estado && { estado }),
          ...(pais && { pais }),
          ...(usuarioId && { usuarioId: parseInt(usuarioId) })
        }
      });

      res.json({
        success: true,
        message: 'Turista atualizado com sucesso',
        data: turista
      });
    } catch (error) {
      console.error('Erro ao atualizar turista:', error);
      
      if (error.code === 'P2025') {
        return res.status(404).json({
          success: false,
          message: 'Turista não encontrado'
        });
      }

      res.status(500).json({
        success: false,
        message: 'Erro ao atualizar turista',
        error: error.message
      });
    }
  },

  // Deletar turista
  deletar: async (req, res) => {
    try {
      const { id } = req.params;
      
      const turista = await prisma.turista.delete({
        where: { id: parseInt(id) }
      });

      res.json({
        success: true,
        message: 'Turista deletado com sucesso',
        data: turista
      });
    } catch (error) {
      console.error('Erro ao deletar turista:', error);
      
      if (error.code === 'P2025') {
        return res.status(404).json({
          success: false,
          message: 'Turista não encontrado'
        });
      }

      res.status(500).json({
        success: false,
        message: 'Erro ao deletar turista',
        error: error.message
      });
    }
  }
};

export default turistaController;