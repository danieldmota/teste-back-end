import { Router } from 'express';
import turistaController from '../controllers/turistaController.js';

const router = Router();

// Rotas para turistas
router.get('/', turistaController.listarTodos);
router.get('/:id', turistaController.buscarPorId);
router.post('/', turistaController.criar);
router.put('/:id', turistaController.atualizar);
router.delete('/:id', turistaController.deletar);

export default router;