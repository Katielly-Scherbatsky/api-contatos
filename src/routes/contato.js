const express = require("express");
const router = express.Router();

// Importação do arquivo controller de contato
const contatoController = require('../controllers/contato.controller');

// Configuração de rotas
// Criar um novo contato
router.post("/contatos", contatoController.create);

// Listar todos os contatos
router.get("/contatos", contatoController.list);

// Editar um contato já existe
router.put("/contatos/:codigo", contatoController.update);

// Deletando um contato da lista
router.delete("/contatos/:codigo", contatoController.destroy);

// Exportação da constante router código padrão
module.exports = router;