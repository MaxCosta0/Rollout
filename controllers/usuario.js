const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const saltRound = 10;
const myPlaintextPassword = 's0P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
// const teste = "$2b$10$zI1j4WgwyO/VA5iYkAwawu8Io8qmwHwDsEoundkrwU/pCdyJ4yV9e";

exports.create = function(req, res){
    // The 'Matricula' and 'Senha' will passsed to hash function    
    var hash = bcrypt.hashSync(req.body.Senha, saltRound);      //function that generate hash which will be stored on DB
    Usuario.create({
        Nome: req.body.Nome,
        Matricula: req.body.Matricula,
        Email: req.body.Email,
        Senha: hash
    }).then(function(usuario){
        res.send(usuario);
    }).catch(function(err){
        res.send(err);
    });
};

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
        Senha: req.body.Senha
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
        bcrypt.compare(senhaBody, usuario.Senha, function(err, resposta){
            if(resposta){
                res.send({authorizedLogin: true})
            }else{
                res.send({authorizedLogin: false})
            }
        })
    })
}