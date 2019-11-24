const express = require('express');
const router = express.Router();

let controller = require('../controllers/status');

router.post('/status/create', controller.create);
router.get('/status/:id', controller.findOne);
router.get('/status', controller.findAll);
router.put('/status/:id/update', controller.update);
router.delete('/status/:id/delete',controller.delete);

module.exports = router;