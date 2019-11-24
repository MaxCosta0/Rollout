const express = require('express');
const router = express.Router();

let controller = require('../controllers/projeto');

router.post('/projeto/create', controller.create);
router.get('/projeto/:id', controller.findOne);
router.get('/projeto', controller.findAll);
router.put('/projeto/:id/update', controller.update);
router.delete('/projeto/:id/delete',controller.delete);

module.exports = router;