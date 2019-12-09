const Usuario = require('../models/usuario');

exports.create = function(req, res){
    Usuario.create({
        Nome: req.body.Nome,
        Matricula: req.body.Matricula,
        Email: req.body.Email,
        Senha: req.body.Senha
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
    //Pagination: 5 elements per page.
    const limit = 5; 
    const offset = (parseInt(req.params.page) - 1) * limit;

    Usuario.findAll({
        offset,
        limit        
    }).then(function(usuarios){
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
