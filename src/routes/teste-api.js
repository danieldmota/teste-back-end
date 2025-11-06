import { Router } from 'express';
import exemploController from '../controllers/exemploController.js';

const router = Router();

router.get('/', (req, res) => {
  res.send('API funcionando 🚀');
});

router.get('/exemplo', exemploController.listar);

export default router;
