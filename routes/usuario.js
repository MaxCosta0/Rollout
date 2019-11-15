const express = require('express');
const router = express.Router();

let usuario_controller = require('../controllers/usuario');

router.post('/usuario/create', usuario_controller.create);
router.get('/usuario/:id', usuario_controller.details);
router.put('/usuario/:id/update', usuario_controller.update);
router.delete('/usuario/:id/delete', usuario_controller.delete);

module.exports = router;