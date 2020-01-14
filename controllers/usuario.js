const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const jwt = require('jwt-simple');
const saltRound = 10;
const chaveSecreta = 'chavesecreta';                                              // Chave usada para gerar o token a ser validado no signup ou sendTokenAgain

//dependencias: npm install bcrypt nodemailer jwt-simple passport passport-local cookie-session
module.exports = {
    create(req, res) {
        nomeBody = req.body.Nome;
        matriculaBody = req.body.Matricula;
        emailBody = req.body.Email;
        senhaBody = req.body.Senha;
        confirmarSenhaBody = req.body.ConfirmarSenha;
        if(!emailBody.includes("@gmail.com")){                                // Verificacao email institucional
            res.send({error: "Email invalido", errorType: "Nao e email institucional"});
        }else{
            if((nomeBody || matriculaBody || emailBody || senhaBody || confirmarSenhaBody) == null){
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
    },

    findOne(req, res) {
        const { id } = req.params
        Usuario.findOne({ where: { id } })
            .then(usuario => res.json(usuario))
            .catch(err => res.json(err))
    },

    findAll(req, res) {
        Usuario.findAll().then(function(usuarios){
            res.send(usuarios);
        }).catch(function(err){
            res.send(err);
        });
    },

    update(req, res) {
        const { Nome, Matricula, Email, Senha } = req.body
        const { id } = req.params
        const hash = bcrypt.hashSync(Senha, saltRound);
        Usuario.update({ Nome, Matricula, Email, Senha: hash },
            { where: { id } })
            .then(usuario => {
                if (usuario[0] !== 0)
                    res.status(200).json({ result: "Usuário atualizado com sucesso." })
                else
                    res.status(200).json({ result: "Usuário não encontrado." })
            })
            .catch(err => res.json(err))
    },

    delete(req, res) {
        const { id } = req.params
        Usuario.destroy({ where: { id } })
            .then(usuario => {
                if (usuario !== 0)
                    res.status(204).json({ result: "Usuário deletado com sucesso." })
                else
                    res.status(404).json({ result: "Usuário não encontrado." })
            })
            .catch(err => res.json(err))
    }
}


const sendToken = function (user) {
    // Credenciais de onde o token sera enviado
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'rolloutsystem@gmail.com',
            pass: 'Sistemarollout'
        }
    });

    // token expirara em 24 horas
    hostVerify = 'localhost:3000/usuario/verifyToken/';       //Quando aplicacao estiver em producao, trocar esse host
    const { Nome, Matricula, Email, Senha } = user
    const token = jwt.encode({
        Nome, Matricula, Email, Senha,
        expire: Date.now() + (60 * 60 * 1000)
    }, chaveSecreta)

    // Corpo do email de verificacao
    const mailOptions = {
        from: 'rolloutsystem@gmail.com',
        to: Email,
        subject: 'Email verification',
        text: 'Visite esse link para verificar a sua conta: http://' + hostVerify + token,
        html: '<a>Clique no link abaixo para verificar a sua conta (O link expira em 1 hora)</a><br><a href="http://'
            + hostVerify + '' + token + '"><h2>Verify your account</h2></a>'
    }
    // Enviar email
    transporter.sendMail(mailOptions, function (error, info) {
        return error ? JSON.parse(error) : JSON.parse(info)
    });
}
