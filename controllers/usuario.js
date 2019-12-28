const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const jwt = require('jwt-simple');
const saltRound = 10;
<<<<<<< HEAD
const secret = 'chavesecreta';
=======
const chaveSecreta = 'chavesecreta';                                              // Trocar a chaveSecreta
>>>>>>> 0aecb0535a828a5b8b92a6bd2654897324c85de4

//dependencias: npm install bcrypt nodemailer jwt-simple

exports.create = function(req, res){
<<<<<<< HEAD
    // The 'Matricula' and 'Senha' will passsed to hash function       
    if (req.body.Senha == req.body.ConfirmarSenha){                 // Se a Senha de entrada for igual a ConfirmaSenha, acontecera o processo de criacao da conta, caso contrario sera retornado um erro
        var usuario = new Usuario();
        var hash = bcrypt.hashSync(req.body.Senha, saltRound);      //function that generate hash which will be stored on DB
        Usuario.create({
            Nome: req.body.Nome,
            Matricula: req.body.Matricula,
            Email: req.body.Email,
            Senha: hash,
            isVerified: false
        }).catch(function(err){
            res.send(err);
        });
        // Credenciais de onde o token sera enviado
        var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'rolloutsystem@gmail.com',
            pass: 'Sistemarollout'
        }
        });
        
        // token expirara em 24 horas
        hostVerify = 'localhost:3000/usuario/verifyToken/';   //Quando aplicacao estiver em producao, trocar esse host
        const token = jwt.encode({
            Nome: req.body.Nome,
            Matricula: req.body.Matricula,
            Email: req.body.Email,
            Senha: hash,
            expire: Date.now() + (60 * 60 * 1000)               // Token configurado para expirar em 1 hora
        }, secret);

        console.log("\n" + hostVerify + token + "\n");
        
        // Corpo do email de verificacao
        var mailOptions = {
            from: 'rolloutsystem@gmail.com',
            to: 'gabrielrbernardi@gmail.com',
            subject: 'Email verification',
            text : 'Visite esse link para verificar a sua conta: http://' + hostVerify + token,
            html : '<a>Clique no link abaixo para verificar a sua conta (O link expira em 1 hora)</a><br><a href="http://'+hostVerify+''+token+'"><h2>Verify your account</h2></a>'
        }
        // Enviar email
        transporter.sendMail(mailOptions,function(error,info){
            if(error){
                // console.log(email_err);
                res.json({emailEnviado: false});
            }else{
                // console.log("Email enviado");
                res.json({emailEnviado : true});
            }
        });
    }else{
        res.send("As senhas entradas sao diferentes");
    }
};

exports.verifyToken = function(req, res){
    var token = req.params.token;
    var dataDecoded = jwt.decode(token, secret);
    // res.send("passou");
=======
    nomeBody = req.body.Nome;
    matriculaBody = req.body.Matricula;
    emailBody = req.body.Email;
    senhaBody = req.body.Senha;
    confirmarSenhaBody = req.body.ConfirmarSenha;
    if(!emailBody.includes("@gmail.com")){                                // Verificacao email institucional
        res.send({error: "Email invalido", errorType: "Nao e email institucional"});
    }else{
        if(nomeBody == null || matriculaBody == null || emailBody == null || senhaBody == null || confirmarSenhaBody == null){
            res.send({error: "Entrada invalida", errorType: "Possui campo nulo"});
        }else{
            // The 'Matricula' and 'Senha' fields will passsed to hash function 
            Usuario.findOne({                                                       //Verficando se ja existe cadastro com o numero de matricula de entrada
                where: {
                    Matricula: req.body.Matricula
                }
            }).then(function(usuario){
                if(usuario == null){                                                // Se retorno do db for null, nao existe o usuario no db, caso contrario, a matricula ja foi usada
                    if (req.body.Senha == req.body.ConfirmarSenha){                 // Se a Senha de entrada for igual a ConfirmaSenha, acontecera o processo de criacao da conta, caso contrario sera retornado um erro
                        var hash = bcrypt.hashSync(req.body.Senha, saltRound);      // function that generate hash which will be stored on DB
                        Usuario.create({
                            Nome: req.body.Nome,
                            Matricula: req.body.Matricula,
                            Email: req.body.Email,
                            Senha: hash,
                            loggedin: false,
                            isVerified: false
                        }).catch(function(err){
                            res.send(err);
                        });
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
                            Nome: req.body.Nome,
                            Matricula: req.body.Matricula,
                            Email: req.body.Email,
                            Senha: hash,
                            expire: Date.now() + (60 * 60 * 1000)                // Token configurado para expirar em 1 hora
                        }, chaveSecreta);

                        // Corpo do email de verificacao
                        var mailOptions = {
                            from: 'rolloutsystem@gmail.com',
                            to: req.body.Email,
                            subject: 'Email verification',
                            text : 'Visite esse link para verificar a sua conta: http://' + hostVerify + token,
                            html : '<a>Clique no link abaixo para verificar a sua conta (O link expira em 1 hora)</a><br><a href="http://'+hostVerify+''+token+'"><h2>Verify your account</h2></a>'
                        }
                        // Enviar email
                        transporter.sendMail(mailOptions,function(error,info){
                            if(error){
                                res.json({emailEnviado: false});
                            }else{
                                res.json({emailEnviado : true});
                            }
                        });
                    }else{
                        res.send({error: "Senhas diferentes", errorType: "Senha e confirmarSenha sao diferentes"});
                    }
                }else{
                    res.send({error: "User error", errorType: "Usuario ja existente"});
                }
            });
        }
    }
};

exports.sendTokenAgain = function(req, res){
    nomeBody = req.body.Nome;
    matriculaBody = req.body.Matricula;
    emailBody = req.body.Email;
    senhaBody = req.body.Senha;

    Usuario.findOne({
        where: {
            Matricula: matriculaBody
        }
    }).then(function(usuario){
        if(usuario != null){                                                                // Se retorno usuario for null, usuario nao existe
            if(usuario.isVerified){                                                         // Verifica se a conta ja foi ativada
                res.send({loginError: "Conta ja verificada"});
            }else{
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
                    text : 'Visite esse link para verificar a sua conta: http://' + hostVerify + token,
                    html : '<a>Clique no link abaixo para verificar a sua conta (O link expira em 1 hora)</a><br><a href="http://'+hostVerify+''+token+'"><h2>Verify your account</h2></a>'
                }
                // Enviar email
                transporter.sendMail(mailOptions,function(error,info){
                    if(error){
                        res.json({emailEnviado: false});
                    }else{
                        res.json({emailEnviado : true});
                    }
                });
            }
        }else{
            res.send({loginError: "Conta inexistente"});
        }
    })
}

exports.verifyToken = function(req, res){
    var token = req.params.token;
    var dataDecoded = jwt.decode(token, chaveSecreta);
>>>>>>> 0aecb0535a828a5b8b92a6bd2654897324c85de4
    if(new Date(dataDecoded.expire) > new Date()){          // Se data do token for maior que a data atual, token ainda e valido
        Usuario.findOne({
            where: {
                Matricula: dataDecoded.Matricula
            }
        }).then(function(usuario){
            if(!usuario){
<<<<<<< HEAD
                // console.log("User not found");
                res.json({error : "User not found"});
=======
                res.json({error: "User error", errorType: "Usuario nao encontrado"});
>>>>>>> 0aecb0535a828a5b8b92a6bd2654897324c85de4
            }else{
                Usuario.update({
                    isVerified: true
                }, {where: {Matricula: dataDecoded.Matricula}}).then(function(){
                    res.status(200).send('Conta verificada com sucesso.');
                }).catch(function(err){
<<<<<<< HEAD
                    res.send("err");
                });
                console.log('User found')
                usuario.save(function(update_err, update_data){
                    if(update_err){
                        console.log(update_err);
                        res.json(update_err);
                    }else{
                        console.log('Conta verificada');
=======
                    res.send(err);
                });
                usuario.save(function(update_error, update_data){
                    if(update_error){
                        res.json(update_error);
                    }else{
>>>>>>> 0aecb0535a828a5b8b92a6bd2654897324c85de4
                        res.json({result : 1});
                    }
                });
            }
        });
    }else{
<<<<<<< HEAD
        // console.log("Link is expired");
=======
>>>>>>> 0aecb0535a828a5b8b92a6bd2654897324c85de4
        res.json({error : "Link expirado"});
    }
}

exports.findOne = function(req, res){
    Usuario.findById(req.params.id).then(function(usuario){
        res.send(usuario);
    }).catch(function(err){
        res.send(err);
    });
};

exports.findAll = function(req, res){
    Usuario.findAll().then(function(usuarios){
        res.send(usuarios);
    }).catch(function(err){
        res.send(err);
    });
};

exports.update = function(req, res){
    Usuario.update({
        Nome: req.body.Nome,
        Matricula: req.body.Matricula,
        Email: req.body.Email,
        Senha: req.body.Senha,
        isVerified: req.body.isVerified
    }, {where: {id: req.params.id}}).then(function(){
        res.status(200).send('Usuario atualizado com sucesso.');
    }).catch(function(err){
        res.send(err);
    });
};

exports.delete = function(req, res){
    Usuario.destroy({
        where: {id: req.params.id}
    }).then(function(){
        res.status(200).send('Usuario deletado com sucesso');
    }).catch(function(err){
        res.send(err);
    });
};

exports.login = function(req, res){
<<<<<<< HEAD
    nomeBody = req.body.Nome
    matriculaBody = req.body.Matricula
    emailBody = req.body.Email
    senhaBody = req.body.Senha
=======
    nomeBody = req.body.Nome;
    matriculaBody = req.body.Matricula;
    emailBody = req.body.Email;
    senhaBody = req.body.Senha;
>>>>>>> 0aecb0535a828a5b8b92a6bd2654897324c85de4

    Usuario.findOne({
        where: {
            Matricula: matriculaBody
        }
    }).then(function(usuario){
<<<<<<< HEAD
        try{
            bcrypt.compare(senhaBody, usuario.Senha, function(err, resposta){       // Se a senha de entrada for igual a senha do db (encriptada), o login sera permitido, caso contrario, o login nao sera permitido
                if(resposta){
                    res.send({authorizedLogin: true})
                }
            })
        }catch(error){
            res.send({authorizedLogin: false})
=======
        if(usuario != null){                                                                // Se retorno usuario for null, usuario nao existe
            if(usuario.isVerified){                                                         // Verifica se a conta ja foi ativada
                try{
                    bcrypt.compare(senhaBody, usuario.Senha, function(err, resposta){       // Se a senha de entrada for igual a senha do db (encriptada), o login sera permitido, caso contrario, o login nao sera permitido
                        if(resposta){
                            Usuario.update({
                                loggedin: true
                            }, {where: {Matricula: matriculaBody}}).then(function(){
                                res.send({authorizedLogin: true});
                            }).catch(function(err){
                                res.send(err);
                            });

                        }else{
                            res.send({authorizedLogin: false});                   
                        }
                    })
                }catch(error){
                    res.send({authorizedLogin: false});
                }
            }else{
                res.send({loginError: "Conta nao verificada"});
            }
        }else{
            res.send({loginError: "Conta inexistente"});
        }
    })
}

exports.logout = function(req, res){
    matriculaBody = req.body.Matricula;
    Usuario.findOne({
        where: {
            Matricula: matriculaBody
        }
    }).then(function(usuario){
        if(!usuario.loggedin)                                                           // Verificacao para saber se o usuario esta conectado ou nao
            res.send({error: "Login Error", errorType: "Usuario nao conectado"});
        else{
            Usuario.update({
                loggedin: false
            }, {where: {Matricula: matriculaBody}}).then(function(){
                res.send({loggedin: false});
            }).catch(function(err){
                res.send(err);
            });
>>>>>>> 0aecb0535a828a5b8b92a6bd2654897324c85de4
        }
    })
}