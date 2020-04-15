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
        selectDomain = req.body.selectDomain;                                           //AlgarMail ou other
        // console.log(selectDomain)
        // console.log(nomeBody + matriculaBody + emailBody + senhaBody + confirmarSenhaBody)
        if((nomeBody || matriculaBody || emailBody || senhaBody || confirmarSenhaBody) == null){
            res.json({nullField: true});
            return;
        }else if(selectDomain == "algarMail"){
            if(emailBody.includes("@")){
                var posDomainEmail = emailBody.indexOf("@");
                var substringEmailBody = emailBody.substring(0, posDomainEmail)
                emailBody = substringEmailBody + "@algartelecom.com.br"
            }else{
                emailBody+="@algartelecom.com.br";
            }
            // return;
        }else if(selectDomain == "other"  && !emailBody.includes("@")){
            res.json({emailInvalido: true});
            return;
        }
            // The 'Matricula' and 'Senha' fields will passsed to hash function 
            console.log(emailBody)
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
                            isVerified: false,
                            userType: "default"
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
                        hostVerify = 'localhost:8080/verifyToken/q?authToken=';       //Quando aplicacao estiver em producao, trocar esse host
                        const token = jwt.encode({
                            Nome: nomeBody,
                            Matricula: matriculaBody,
                            Email: emailBody,
                            Senha: hash,
                            expire: Date.now() + (60 * 60 * 1000)                // Token configurado para expirar em 1 hora
                        }, chaveSecreta);
                        console.log(token)
                        // Corpo do email de verificacao
        
                        var mailOptions = {
                            from: 'rolloutsystem@gmail.com',
                            to: emailBody,
                            subject: 'Verificação da conta/Rollout System',
                            text : 'Visite esse link para verificar a sua conta: http://' + hostVerify + token,
                            html : '<a>Clique no link abaixo para verificar a sua conta (O link expira em 1 hora)</a><br><a href="http://'+hostVerify+''+token+'"><h2>Clique aqui para verificar a sua conta</h2></a>'
                        }
                      
                        // Enviar email
                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                res.json({ emailEnviado: false });
                            } else {
                                res.json({ emailEnviado: true });
                            }
                        });
                    }else{
                        res.json({senhasDiferentes: true});
                    }
                }else{
                    res.json({ usuarioExistente: true });
                }
            });
        
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

    usuarioNotVerified(req, res){
        Usuario.findAll({
            where: {
                isVerifiedByAdmin: false,
            }
        }).then(function(usuarios){
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

    verifyByAdmin(req, res){
        const { id, chooseStatusVerify } = req.body;
        Usuario.update({ isVerifiedByAdmin: true, refusedByAdmin: !chooseStatusVerify },
            { where: { id } })
            .then(usuario => {
                if (usuario[0] !== 0)
                    if(!chooseStatusVerify == 0){
                        res.status(200).json({ usuarioVerificado: true, result: "Registro aceito." })    
                    }else{
                        res.status(200).json({ usuarioVerificado: true, result: "Registro recusado" })
                    }
                    // res.status(200).json({ usuarioVerificado: true, result: "Registro atualizado com sucesso." })
                else
                    res.status(200).json({ usuarioVerificado: false, result: "Usuário não encontrado." })
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
    hostVerify = 'localhost:3880/verifyToken/';       //Quando aplicacao estiver em producao, trocar esse host
    const { Nome, Matricula, Email, Senha } = user
    const token = jwt.encode({
        Nome, Matricula, Email, Senha,
        expire: Date.now() + (60 * 60 * 1000)
    }, chaveSecreta)

    // Corpo do email de verificacao
    var mailOptions = {
        from: 'rolloutsystem@gmail.com',
        to: req.body.Email,
        subject: 'Verificação da conta/Rollout System',
        text : 'Visite esse link para verificar a sua conta: http://' + hostVerify + token,
        html : '<a>Clique no link abaixo para verificar a sua conta (O link expira em 1 hora)</a><br><a href="http://'+hostVerify+''+token+'"><h2>Clique aqui para verificar a sua conta</h2></a>'
    }
    // Enviar email
    transporter.sendMail(mailOptions, function (error, info) {
        return error ? JSON.parse(error) : JSON.parse(info)
    });
}
