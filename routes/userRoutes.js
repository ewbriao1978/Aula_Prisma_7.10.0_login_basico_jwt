const express = require('express');
const app = express();
const router = express.Router();
const userController = require('../controllers/userController');
const produtoController = require('../controllers/produtoController');
const authMiddleware = require('../middlewares/auth');

// Rota para registrar um novo usuário
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/criar_produto', authMiddleware, produtoController.criarProduto);
router.get('/produtos', authMiddleware, produtoController.getProdutos);

module.exports = router;    