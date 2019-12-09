const express = require('express');
const router = express.Router();

let controller = require('../controllers/usuario');

router.post('/usuario/create', controller.create);
router.get('/usuario/:id', controller.findOne);
router.get('/usuarios/:page', controller.findAll);
router.put('/usuario/:id/update', controller.update);
router.delete('/usuario/:id/delete',controller.delete);

module.exports = router;