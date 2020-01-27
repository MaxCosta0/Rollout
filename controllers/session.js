const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const jwt = require('jwt-simple');
const chaveSecreta = 'chavesecreta';                                              // Trocar a chaveSecreta
const cookieParser = require('cookie-parser');
const loginHost = 'http://localhost:8080/';

exports.login = function (req, res) {
    
    if(req.cookies['userData'] != null){                                                          // Se possui cookie armazenado, faz o login com o cookie
        var token = req.cookies['userData'];
        var dataDecoded = jwt.decode(token, chaveSecreta);
        if (new Date(dataDecoded.expire) > new Date()) {          // Se data do token for maior que a data atual, token ainda e valido
            res.json({ authorizedLogin: true, loginType: 'token' });
        } else {
            res.json({ error: "Token expirado" });
        }
    }else{                                                                                        // Se nao possui o cookie, faz a verificacao por meio dos campos passados pelo fron-end
        // nomeBody = req.body.Nome;
        matriculaBody = req.body.Matricula;
        // emailBody = req.body.Email;
        senhaBody = req.body.Senha;
        lembrarBody = req.body.LembrarUsuario;
        Usuario.findOne({
            where: {
                Matricula: matriculaBody
            }
        }).then(function (usuario) {
            if (usuario != null) {                                                                // Se retorno usuario for null, usuario nao existe
                if (usuario.isVerified) {                                                         // Verifica se a conta ja foi ativada
                    try {
                        bcrypt.compare(senhaBody, usuario.Senha, function (err, resposta) {       // Se a senha de entrada for igual a senha do db (encriptada), o login sera permitido, caso contrario, o login nao sera permitido
                            if (resposta) {
                                Usuario.update({
                                    loggedin: true
                                }, { where: { Matricula: matriculaBody } }).then(function () {
                                    if(lembrarBody){
                                        const loginToken = jwt.encode({
                                            matriculaToken: matriculaBody,
                                            senhaToken: senhaBody,
                                            expire: Date.now() + (60 * 60 * 1000 * 24 * 7)                // Token configurado para expirar em 1 semana
                                        }, chaveSecreta);
                                        res.cookie("userData", loginToken);
                                    }
                                    res.json({ authorizedLogin: true });
                                    // res.status(200).redirect('http://localhost:8080/home');
                                }).catch(function (err) {
                                    res.json(err);
                                });

                            } else {
                                res.json({ authorizedLogin: false });
                                // res.status(401).redirect('http://localhost:8080/');
                            }
                        })
                    } catch (error) {
                        res.json({ authorizedLogin: false });
                        // res.status(401).redirect(loginHost);
                    }
                } else {
                    res.json({ loginError: "Conta nao verificada" });
                }
            } else {
                res.json({ authorizedLogin: false, loginError: "Conta inexistente" });
            }
        })
    }
}

exports.logout = function (req, res) {
    matriculaBody = req.body.Matricula;
    Usuario.findOne({
        where: {
            Matricula: matriculaBody
        }
    }).then(function (usuario) {
        if (!usuario.loggedin)                                                           // Verificacao para saber se o usuario esta conectado ou nao
            res.json({ error: "Login Error", errorType: "Usuario nao conectado" });
        else {
            Usuario.update({
                loggedin: false
            }, { where: { Matricula: matriculaBody } }).then(function () {
                // res.clearCookie('userData');
                res.json({ loggedin: false });
            }).catch(function (err) {
                res.json({logoutError: 'Erro ao fazer logout'});
            });
        }
    })
}

exports.sendTokenAgain = function (req, res) {
    nomeBody = req.body.Nome;
    matriculaBody = req.body.Matricula;
    emailBody = req.body.Email;
    senhaBody = req.body.Senha;

    Usuario.findOne({
        where: {
            Matricula: matriculaBody
        }
    }).then(function (usuario) {
        if (usuario != null) {                                                                // Se retorno usuario for null, usuario nao existe
            if (usuario.isVerified) {                                                         // Verifica se a conta ja foi ativada
                res.json({ loginError: "Conta ja verificada" });
            } else {
                // Credenciais de onde o token sera enviado
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'rolloutsystem@gmail.com',
                        pass: 'Sistemarollout'
                    }
                });

                // token expirara em 24 horas
                hostVerify = 'localhost:3000/usuario/verifyToken/';       //Quando aplicacao estiver em producao, trocar esse host
                const token = jwt.encode({
                    Nome: nomeBody,
                    Matricula: matriculaBody,
                    Email: emailBody,
                    Senha: usuario.Senha,
                    expire: Date.now() + (60 * 60 * 1000)                // Token configurado para expirar em 1 hora
                }, chaveSecreta);
                // Corpo do email de verificacao
                var mailOptions = {
                    from: 'rolloutsystem@gmail.com',
                    to: req.body.Email,
                    subject: 'Email verification',
                    text: 'Visite esse link para verificar a sua conta: http://' + hostVerify + token,
                    html: '<a>Clique no link abaixo para verificar a sua conta (O link expira em 1 hora)</a><br><a href="http://' + hostVerify + '' + token + '"><h2>Verify your account</h2></a>'
                }
                // Enviar email
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        res.json({ emailEnviado: false });
                    } else {
                        res.json({ emailEnviado: true });
                    }
                });
            }
        } else {
            res.json({ loginError: "Conta inexistente" });
        }
    })
}

exports.verifyToken = function (req, res) {
    var token = req.params.token;
    var dataDecoded = jwt.decode(token, chaveSecreta);
    if (new Date(dataDecoded.expire) > new Date()) {          // Se data do token for maior que a data atual, token ainda e valido
        Usuario.findOne({
            where: {
                Matricula: dataDecoded.Matricula
            }
        }).then(function (usuario) {
            if (!usuario) {
                res.json({ error: "User error", errorType: "Usuario nao encontrado" });
            } else {
                Usuario.update({
                    isVerified: true
                }, { where: { Matricula: dataDecoded.Matricula } }).then(function () {
                    res.status(200).json('Conta verificada com sucesso.');
                }).catch(function (err) {
                    res.json(err);
                });
                usuario.save(function (update_error, update_data) {
                    if (update_error) {
                        res.json(update_error);
                    } else {
                        res.json({ result: 1 });
                    }
                });
            }
        });
    } else {
        res.json({ error: "Link expirado" });
    }
}
