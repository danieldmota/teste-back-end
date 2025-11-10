import { Router } from 'express';
import userController from '../controllers/userController.js';

const router = Router();

// Rotas para usuários
router.get('/', userController.listarTodos);
router.get('/cpf/:cpf', userController.buscarPorCpf);     // 👈 Nova rota
router.get('/login/:login', userController.buscarPorLogin); // 👈 Nova rota
router.get('/:id', userController.buscarPorId);
router.post('/', userController.criar);
router.put('/:id', userController.atualizar);
router.delete('/:id', userController.deletar);

export default router;