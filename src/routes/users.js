import { Router } from 'express';
import userController from '../controllers/userController.js';

const router = Router();

// Rotas para usuários
router.get('/', userController.listarTodos);
router.get('/cpf/:cpf', userController.buscarPorCpf);     
router.get('/login/:login', userController.buscarPorLogin); 
router.get('/:id', userController.buscarPorId);
router.post('/', userController.criar);
router.put('/:id', userController.atualizar);
router.delete('/:id', userController.deletar);

export default router;