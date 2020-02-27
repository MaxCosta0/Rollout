const express = require('express');
const router = express.Router();

let controller = require('../controllers/atividade');

router.post('/atividade/create', controller.create);
router.get('/atividade/:id', controller.findOne);
router.get('/atividades/:page/:estacaoId', controller.findAll);
router.put('/atividade/:id/update', controller.update);
router.delete('/atividade/:id/delete',controller.delete);

module.exports = router;