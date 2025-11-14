import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../../config/prisma.js";

const SECRET = process.env.JWT_SECRET || "minha-chave-secreta";

export const authService = {

  // LOGIN
  async login(login, senha) {
    const user = await prisma.users.findUnique({
      where: { login }
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const senhaValida = await bcrypt.compare(senha, user.senha);

    if (!senhaValida) {
      throw new Error("Senha incorreta");
    }

    const token = jwt.sign(
      {
        id: user.id,
        login: user.login,
        cpf: user.cpf
      },
      SECRET,
      { expiresIn: "1d" }
    );

    return { token, user };
  },

  // REGISTER
  async register(data) {
    // hash da senha
    const hash = await bcrypt.hash(data.senha, 10);

    const user = await prisma.users.create({
      data: {
        nome: data.nome,
        cpf: data.cpf,
        login: data.login,
        senha: hash,
      }
    });

    return user;
  }
};
