import { turistaService } from "./turista.service.js";

export const turistaController = {
  listarTodos: async (req, res) => {
    try {
      const turistas = await turistaService.listarTodos();
      res.json({
        success: true,
        data: turistas,
        total: turistas.length
      });
    } catch (error) {
      console.error("Erro:", error);
      res.status(500).json({ success: false, message: "Erro ao buscar turistas" });
    }
  },

  buscarPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const turista = await turistaService.buscarPorId(id);

      if (!turista) {
        return res.status(404).json({ success: false, message: "Turista não encontrado" });
      }

      res.json({ success: true, data: turista });
    } catch (error) {
      res.status(500).json({ success: false, message: "Erro ao buscar turista" });
    }
  },

  criar: async (req, res) => {
    try {
      const { cidade, estado, pais, usuarioId } = req.body;

      if (!usuarioId) {
        return res.status(400).json({ success: false, message: "usuarioId é obrigatório" });
      }

      const turista = await turistaService.criar({ cidade, estado, pais, usuarioId });

      res.status(201).json({
        success: true,
        message: "Turista criado com sucesso",
        data: turista
      });

    } catch (error) {
      if (error.code === "P2003") {
        return res.status(400).json({ success: false, message: "UsuarioId não existe" });
      }
      res.status(500).json({ success: false, message: "Erro ao criar turista" });
    }
  },

  atualizar: async (req, res) => {
    try {
      const { id } = req.params;
      const dados = req.body;

      const turista = await turistaService.atualizar(id, dados);

      res.json({ success: true, message: "Atualizado com sucesso", data: turista });

    } catch (error) {
      if (error.code === "P2025") {
        return res.status(404).json({ success: false, message: "Turista não encontrado" });
      }

      res.status(500).json({ success: false, message: "Erro ao atualizar turista" });
    }
  },

  deletar: async (req, res) => {
    try {
      const { id } = req.params;

      const turista = await turistaService.deletar(id);

      res.json({ success: true, message: "Deletado com sucesso", data: turista });

    } catch (error) {
      if (error.code === "P2025") {
        return res.status(404).json({ success: false, message: "Turista não encontrado" });
      }

      res.status(500).json({ success: false, message: "Erro ao deletar turista" });
    }
  }
};