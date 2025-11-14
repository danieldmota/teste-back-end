export const JWT_CONFIG = {
  secret: process.env.JWT_SECRET || 'seuSegredoSuperSecretoAqui',
  expiresIn: '24h' // Token expira em 24 horas
};