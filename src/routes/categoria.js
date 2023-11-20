// Colocar as rotas referente ao recursos
// de categorias
const express = require('express');
const categoriaController = require('../controllers/categoria.controller');

const router = express.Router();

router.get('/categoria',  categoriaController.list);
router.get('/categoria/:codigo',  categoriaController.show);
router.post('/categoria',  categoriaController.create);
router.put('/categoria/:codigo',  categoriaController.update);
router.delete('/categoria/:codigo',  categoriaController.destroy);

// exports das configs;
module.exports = router;