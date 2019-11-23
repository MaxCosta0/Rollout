const express = require('express');
const router = express.Router();

let EstadoController = require('../controllers/EstadoController');

router.post('/estado/create', EstadoController.create);
router.get('/estado/:id', EstadoController .details);
router.put('/estado/:id/update', EstadoController.update);
router.delete('/estado/:id/delete', EstadoController.delete);

module.exports = router;