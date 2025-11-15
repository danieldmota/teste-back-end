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