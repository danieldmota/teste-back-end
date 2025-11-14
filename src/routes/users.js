import { Router } from 'express';
import userController from '../controllers/userController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

//  ROTAS PÚBLICAS
router.post('/login', userController.login);
router.post('/register', userController.criarComHash);

//  ROTAS PROTEGIDAS (precisam de token)
router.get('/me', authMiddleware, userController.getMe);
router.put('/me', authMiddleware, userController.atualizar);

//  ROTAS EXISTENTES (mantém como estão)
router.get('/', userController.listarTodos);
router.get('/cpf/:cpf', userController.buscarPorCpf);     
router.get('/login/:login', userController.buscarPorLogin); 
router.get('/:id', userController.buscarPorId);
router.post('/', userController.criarComHash); 
router.put('/:id', userController.atualizar);
router.delete('/:id', userController.deletar);

export default router;