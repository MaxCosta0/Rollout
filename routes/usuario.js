const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuario');
const sessionController = require('../controllers/session');

router.post('/usuario/create', usuarioController.create);
router.get('/usuario/:id', usuarioController.findOne);
router.get('/usuario', usuarioController.findAll);
router.get('/usuarioNotVerified', usuarioController.usuarioNotVerified);
router.put('/usuario/verifyByAdmin', usuarioController.verifyByAdmin);
router.put('/usuario/:id/update', usuarioController.update);
router.delete('/usuario/:id/delete',usuarioController.delete);
router.post('/usuario/login', sessionController.login);
router.post('/usuario/checkLogin', sessionController.checkLogin);
router.post('/usuario/logout', sessionController.logout);
router.post('/usuario/verifyToken', sessionController.verifyToken);
router.post('/usuario/sendTokenAgain', sessionController.sendTokenAgain);
router.post('/usuario/redefinirSenha', sessionController.redefinirSenha);
router.post('/usuario/redefinirSenhaConfirm', sessionController.redefinirSenhaConfirm);
router.post('/usuario/checkUserType', sessionController.checkUserType);
router.post('/usuario/checkByAdmin', sessionController.checkByAdmin);
router.post('/usuario/updateUserType', sessionController.updateUserType);

module.exports = router;