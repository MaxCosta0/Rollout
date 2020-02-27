const express = require('express');
const router = express.Router();

let controller = require('../controllers/estacao');

router.post('/estacao/create', controller.create);
router.get('/estacao/:id', controller.findOne);
router.get('/estacoes/:page/:projetoId', controller.findAll);
router.put('/estacao/:id/update', controller.update);
router.delete('/estacao/:id/delete',controller.delete);

module.exports = router;