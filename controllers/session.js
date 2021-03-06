const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const jwt = require('jwt-simple');
const chaveSecreta = 'chavesecreta';                                              // Trocar a chaveSecreta
const cookieParser = require('cookie-parser');
const saltRound = 10;
const loginHost = 'http://localhost:8080/';

exports.login = function (req, res) {
    
    if(req.cookies['userData'] != null){                                                          // Se possui cookie armazenado, faz o login com o cookie
        var token = req.cookies['userData'];
        var dataDecoded = jwt.decode(token, chaveSecreta);
        if (new Date(dataDecoded.expire) > new Date()) {          // Se data do token for maior que a data atual, token ainda e valido
            res.json({ authorizedLogin: true, loginType: 'token' });
        } else {
            res.json({ authorizedLogin: false, loginError: "Token expirado" });
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
                                    res.json({ authorizedLogin: true, user: usuario.Nome, userType: usuario.userType });
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
                    res.json({ authorizedLogin: false, loginError: "Conta não verificada" });
                }
            } else {
                res.json({ authorizedLogin: false, loginError: "Conta inexistente" });
            }
        })
    }
}

exports.checkLogin = function(req, res){
    matriculaBody = req.body.Matricula;
    senhaBody = req.body.Senha;
    Usuario.findOne({
        where: {
            Matricula: matriculaBody,
            userType: "admin",
        }
    }).then(function (usuario) {
        try {
            bcrypt.compare(senhaBody, usuario.Senha, function (err, resposta) {       // Se a senha de entrada for igual a senha do db (encriptada), o login sera permitido, caso contrario, o login nao sera permitido
                if (resposta) {                       
                    res.json({ authorizedLogin: true });
                } else {
                    res.json({ authorizedLogin: false, authError: "Matricula ou senha incorretos" });
                }
            })
        } catch (error) {
            res.json({ authorizedLogin: false, authError: "Usuário não tem permissão. Contacte o adminstrador do sistema para mais informações." });
        }
    })
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
    // nomeBody = req.body.Nome;
    // matriculaBody = req.body.Matricula;
    // emailBody = req.body.Email;
    // senhaBody = req.body.Senha;

    matriculaBody = req.body.Matricula;
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
                hostVerify = 'localhost:8080/verifyToken/';       //Quando aplicacao estiver em producao, trocar esse host
                const token = jwt.encode({
                    // Nome: nomeBody,
                    Matricula: matriculaBody,
                    // Email: emailBody,
                    Senha: usuario.Senha,
                    expire: Date.now() + (60 * 60 * 1000)                // Token configurado para expirar em 1 hora
                }, chaveSecreta);
                console.log(token)
                // Corpo do email de verificacao

                var mailOptions = {
                    from: 'rolloutsystem@gmail.com',
                    to: usuario.Email,
                    subject: 'Verificação da conta/Rollout System',
                    text : 'Visite esse link para verificar a sua conta: http://' + hostVerify + token,
                    html : '<a>Clique no link abaixo para verificar a sua conta (O link expira em 1 hora)</a><br><a href="http://'+hostVerify+''+token+'"><h2>Clique aqui para verificar a sua conta</h2></a>'
                }
              
                // Enviar email
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(token)
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
    var token = req.body.Token;
    var segments = token.split('.');
    if(!token){
        res.json({ contaVerificada: false, authError: "Não existe token"})
    }else if(segments.length !== 3){
        res.json({contaVerificada: false, authError: "Token Inválido"})
    }
    else{
        var dataDecoded = jwt.decode(token, chaveSecreta, true);
        if (new Date(dataDecoded.expire) > new Date()) {          // Se data do token for maior que a data atual, token ainda e valido
            Usuario.findOne({
                where: {
                    Matricula: dataDecoded.Matricula
                }
            }).then(function (usuario) {
                if (!usuario) {
                    res.json({ contaVerificada: false, authError: "Usuario não encontrado" });
                } else {
                    Usuario.update({
                        isVerified: true
                    }, { where: { Matricula: dataDecoded.Matricula } }).then(function () {
                        res.status(200).json({contaVerificada: true});
                    }).catch(function (err) {
                        res.json(err);
                    });
                }
            });
        } else {
            res.json({ contaVerificada: false, authError: "Token expirado" });
        }
    }
}

exports.redefinirSenha = function (req, res) {
    let matriculaRedefine = req.body.Matricula;
    let emailRedefine = req.body.Email;
    // var senhaBody = req.body.Senha;

    Usuario.findOne({
        where: {
            Matricula: matriculaRedefine
        }
    }).then(function(usuario){
        if(usuario != null){
            if(usuario.Email == emailRedefine){
                // res.json({contaEncontrada: true});
                let randomString = '';
                let randomNumber;
                //generate random string
                for(var i = 0; i < 12; i++){
                    if(i % 3 == 0){
                        randomNumber = Math.floor(Math.random() * (91 - 65) ) + 65;
                        randomString += String.fromCharCode(randomNumber);
                    }else if(i % 3 == 1){
                        randomNumber = Math.floor(Math.random() * (47 - 33) ) + 33;
                        randomString += String.fromCharCode(randomNumber);
                    }else if(i % 3 == 2){
                        randomNumber = Math.floor(Math.random() * (122 - 97) ) + 97;
                        randomString += String.fromCharCode(randomNumber);
                    }
                }
                // res.json({emailEnviado: true})
                // res.json({randomString: randomString});
                
                Usuario.update({
                    SenhaTemp: randomString
                }, { where: { Matricula: matriculaRedefine } })
                .catch(function (err) {
                    res.json({emailEnviado: false});
                });

                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'rolloutsystem@gmail.com',
                        pass: 'Sistemarollout'
                    }
                });

                var mailOptions = {
                    from: 'rolloutsystem@gmail.com',
                    to: usuario.Email,
                    subject: 'Redefinição de senha / Rollout System',
                    text : 'A sua senha temporária é: ' + randomString,
                }
            
                // Enviar email
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(token)
                        res.json({ emailEnviado: false });
                    } else {
                        res.json({ emailEnviado: true });
                    }
                });
            }else{
                res.json({usuarioEncontrado: true, emailEncontrado: false})
            }
        }else{
            res.json({usuarioEncontrado: false, emailEncontrado: false})
        }
    })
}

exports.redefinirSenhaConfirm = function (req, res){
    var matriculaRedefine = req.body.Matricula;
    var senhaEnviada = req.body.SenhaEnviada;
    var newSenha = req.body.NewSenha;
    var confirmNewSenha = req.body.ConfirmNewSenha;
    console.log(matriculaRedefine)
    Usuario.findOne({
        where: {
            Matricula: matriculaRedefine
        }
    }).then(function(usuario){
        if(usuario != null){
            if(usuario.SenhaTemp == senhaEnviada){
                if(newSenha == confirmNewSenha){
                    var hash = bcrypt.hashSync(newSenha, saltRound);
                    Usuario.update({
                        Senha: hash
                    }, { where: { Matricula: matriculaRedefine } })
                    .catch(function (err) {
                        res.json({redefineSenha: false, errorType: "Erro na atualizacao no DB. Contacte o adminstrador do sistema."});
                    });
                    res.json({redefineSenha: true});
                }else{
                    res.json({redefineSenha: false, errorType: "Nova senha e Confirmar nova senha diferentes"})
                }
            }else{
                res.json({redefineSenha: false, errorType: "A senha enviada incorreta"});
            }
        }
    })
}

exports.checkUserType = function(req, res){
    const { Matricula } = req.body;
    Usuario.findOne({
        where: {
            Matricula: Matricula
        }
    }).then(function(usuario){
        res.send(usuario.userType)
    })
}

exports.checkByAdmin = function(req, res){
    Usuario.findAll({
        where: {
            userType: 'default',
        }
    }).then(function(usuarios){
        res.send(usuarios);
    }).catch(function(err){
        res.send(err);
    });
}

exports.updateUserType = function(req, res){
    var { id, userType, currentUserId, userToBeChanged } = req.body;
    console.log(userToBeChanged)
    console.log(currentUserId)
    if(currentUserId == userToBeChanged){
        res.send({userUpdated: false, result: "Não é possivel alterar os privilégios desta conta. Contacte outro administrador do sistema para mais informações."});
    }else{
        Usuario.findOne({
            where: {
                id: id
            }
        }).then(function(usuario){
            if(userType == 0 && usuario.userType != "admin"){
                Usuario.update({ userType: "admin" },
                    { where: { id } })
                    .then(usuario => {
                        if (usuario[0] !== 0)
                            res.status(200).json({ userUpdated: true, result: "Usuário atualizado com sucesso." })
                        else
                            res.status(200).json({ userUpdated: false, result: "Usuário não encontrado." })
                    })
                    .catch(err => res.json(err))
            }else if(userType == 1 && usuario.userType != "default"){
                Usuario.update({ userType: "default" },
                    { where: { id } })
                    .then(usuario => {
                        if (usuario[0] !== 0)
                            res.status(200).json({ userUpdated: true, result: "Usuário atualizado com sucesso." })
                        else
                            res.status(200).json({ userUpdated: false, result: "Usuário não encontrado." })
                    })
                    .catch(err => res.json(err))
            }
        })
    }
}