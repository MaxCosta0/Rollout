# Routes

Nesta pasta estao arquivos .js responsaveis unicamente por fazer a requisição dos controladores quando estivermos manipulando o BD. Codigo exemplo:

```JavaScript
const express = require('express');
const router = express.Router();

let controller = require('../controllers/usuario');

router.post('/usuario/create', controller.create);
router.get('/usuario/:id', controller.findOne);
router.get('/usuario', controller.findAll);
router.put('/usuario/:id/update', controller.update);
router.delete('/usuario/:id/delete',controller.delete);

module.exports = router;
```
Este codigo faz a requisição do arquivo .js de usuario na pasta dos controladores (controllers), atribui uma rota a cada funcionalidade do CRUD e exporta as mesmas para nosso arquivo index.js que faz uso destas rotas. Todos os arquivos .js desta pasta fazem a mesma coisa para cada entidade do BD.