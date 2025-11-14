import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "minha-chave-secreta";

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token obrigatório" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded; // adiciona info do usuário na request
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
}