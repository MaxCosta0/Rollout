const express = require('express');
const router = express.Router();

let controller = require('../controllers/cidade');

router.post('/cidade/create', controller.create);
router.get('/cidade/:id', controller.findOne);
router.get('/cidade', controller.findAll);
router.put('/cidade/:id/update', controller.update);
router.delete('/cidade/:id/delete',controller.delete);

module.exports = router;