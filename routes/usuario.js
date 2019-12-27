const express = require('express');
const router = express.Router();

let controller = require('../controllers/usuario');

router.post('/usuario/create', controller.create);
router.get('/usuario/:id', controller.findOne);
router.get('/usuario', controller.findAll);
router.put('/usuario/:id/update', controller.update);
router.delete('/usuario/:id/delete',controller.delete);
router.post('/usuario/login', controller.login);
router.post('/usuario/logout', controller.logout);
router.post('/usuario/verifyToken/:token', controller.verifyToken);
router.post('/usuario/sendTokenAgain', controller.sendTokenAgain);

module.exports = router;