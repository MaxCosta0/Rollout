const express = require('express');
const router = express.Router();

let controller = require('../controllers/estado');

router.post('/estado/create', controller.create);
router.get('/estado/:id', controller.findOne);
router.get('/estados/:page', controller.findAll);
router.put('/estado/:id/update', controller.update);
router.delete('/estado/:id/delete',controller.delete);

module.exports = router;