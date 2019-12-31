const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const jwt = require('jwt-simple');
const saltRound = 10;
const chaveSecreta = 'chavesecreta';                                              // Trocar a chaveSecreta

//dependencias: npm install bcrypt nodemailer jwt-simple
module.exports = {
    create(req, res) {
        const { Nome, Matricula, Email, Senha, ConfirmarSenha } = req.body

        if (!Email.includes(process.env.EMAILDOMAIN))
            res.status(406).json({ error: "Non-institucional e-mail." });
        else {
            if (Nome || Matricula || Email || Senha || ConfirmarSenha)
                res.status(406).json({ error: "Null field." });
            else {
                Usuario.findOne({ where: { Matricula } })
                    .then(user => {
                        if (!user) {
                            if (Senha !== ConfirmarSenha)
                                res.status(406).json({ error: "Passwords do not converge." });
                            else {
                                const hash = bcrypt.hashSync(Senha, saltRound);
                                Usuario.create({ 
                                    Nome, Matricula, Email, 
                                    Senha: hash,
                                    loggedin: false, 
                                    isVerified: false})
                                    .then(usuario => {
                                        sendToken(usuario)
                                        res.json(usuario)
                                    })
                                    .catch(err => res.json(err))
                            }
                        } else
                            res.json({ error: "User already exists." });
                    }).catch(err => res.json(err));
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
        const limit = 10;
        const offset = (parseInt(req.params.page) - 1) * limit;

        Usuario.findAll({
            offset,
            limit
        })
            .then(usuarios => res.json(usuarios))
            .catch(err => res.json(err))
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
