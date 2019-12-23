const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const jwt = require('jwt-simple');
const saltRound = 10;
const secret = 'chavesecreta';

//dependencias: npm install bcrypt nodemailer jwt-simple

exports.create = function(req, res){
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
    if(new Date(dataDecoded.expire) > new Date()){          // Se data do token for maior que a data atual, token ainda e valido
        Usuario.findOne({
            where: {
                Matricula: dataDecoded.Matricula
            }
        }).then(function(usuario){
            if(!usuario){
                // console.log("User not found");
                res.json({error : "User not found"});
            }else{
                Usuario.update({
                    isVerified: true
                }, {where: {Matricula: dataDecoded.Matricula}}).then(function(){
                    res.status(200).send('Conta verificada com sucesso.');
                }).catch(function(err){
                    res.send("err");
                });
                console.log('User found')
                usuario.save(function(update_err, update_data){
                    if(update_err){
                        console.log(update_err);
                        res.json(update_err);
                    }else{
                        console.log('Conta verificada');
                        res.json({result : 1});
                    }
                });
            }
        });
    }else{
        // console.log("Link is expired");
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
    nomeBody = req.body.Nome
    matriculaBody = req.body.Matricula
    emailBody = req.body.Email
    senhaBody = req.body.Senha

    Usuario.findOne({
        where: {
            Matricula: matriculaBody
        }
    }).then(function(usuario){
        try{
            bcrypt.compare(senhaBody, usuario.Senha, function(err, resposta){       // Se a senha de entrada for igual a senha do db (encriptada), o login sera permitido, caso contrario, o login nao sera permitido
                if(resposta){
                    res.send({authorizedLogin: true})
                }
            })
        }catch(error){
            res.send({authorizedLogin: false})
        }
    })
}