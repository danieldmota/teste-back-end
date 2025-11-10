import { Router } from 'express';
import exemploController from '../controllers/exemploController.js';

const router = Router();

router.get('/', (req, res) => {
  res.send('API funcionando 🚀  Vamos para a proxima etapa gerar CRUD');
});

router.get('/exemplo', exemploController.listar);

export default router;
