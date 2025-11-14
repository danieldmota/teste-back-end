import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const turistaService = {
  listarTodos: () => {
    return prisma.turista.findMany({
      orderBy: { id: "asc" }
    });
  },

  buscarPorId: (id) => {
    return prisma.turista.findUnique({
      where: { id: parseInt(id) }
    });
  },

  criar: ({ cidade, estado, pais, usuarioId }) => {
    return prisma.turista.create({
      data: {
        cidade: cidade || null,
        estado: estado || null,
        pais: pais || null,
        usuarioId: parseInt(usuarioId)
      }
    });
  },

  atualizar: (id, dados) => {
    return prisma.turista.update({
      where: { id: parseInt(id) },
      data: dados
    });
  },

  deletar: (id) => {
    return prisma.turista.delete({
      where: { id: parseInt(id) }
    });
  }
};
