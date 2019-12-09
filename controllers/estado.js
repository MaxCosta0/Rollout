const Estado = require('../models/estado');

exports.create = function(req, res){
   Estado.create({
        Nome: req.body.Nome
    }).then(function(estado){
        res.send(estado);
    }).catch(function(err){
        res.send(err);
    });
};

exports.findOne = function(req, res){
    Estado.findById(req.params.id).then(function(estado){
        res.send(estado);
    }).catch(function(err){
        res.send(err);
    });
};

exports.findAll = function(req, res){
    //Pagination: 5 elements per page.
    const limit = 5; 
    const offset = (parseInt(req.params.page) - 1) * limit;

    Estado.findAll({
        offset,
        limit
    }).then(function(estados){
        res.send(estados);
    }).catch(function(err){
        res.send(err);
    });
};

exports.update = function(req, res){
    Estado.update({
        Nome: req.body.Nome,
        Matricula: req.body.Matricula,
        Email: req.body.Email,
        Senha: req.body.Senha
    }, {where: {id: req.params.id}}).then(function(){
        res.status(200).send('Estado atualizado com sucesso.');
    }).catch(function(err){
        res.send(err);
    });
};

exports.delete = function(req, res){
    Estado.destroy({
        where: {id: req.params.id}
    }).then(function(){
        res.status(200).send('Estado deletado com sucesso');
    }).catch(function(err){
        res.send(err);
    });
};
