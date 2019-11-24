const Cidade = require('../models/cidade');

exports.create = function(req, res){
   Cidade.create({
        Nome: req.body.Nome
    }).then(function(cidade){
        res.send(cidade);
    }).catch(function(err){
        res.send(err);
    });
};

exports.findOne = function(req, res){
    Cidade.findById(req.params.id).then(function(cidade){
        res.send(cidade);
    }).catch(function(err){
        res.send(err);
    });
};

exports.findAll = function(req, res){
    Cidade.findAll().then(function(cidades){
        res.send(cidades);
    }).catch(function(err){
        res.send(err);
    });
};

exports.update = function(req, res){
    Cidade.update({
        Nome: req.body.Nome
    }, {where: {id: req.params.id}}).then(function(){
        res.status(200).send('Cidade atualizada com sucesso.');
    }).catch(function(err){
        res.send(err);
    });
};

exports.delete = function(req, res){
    Cidade.destroy({
        where: {id: req.params.id}
    }).then(function(){
        res.status(200).send('Cidade deletada com sucesso');
    }).catch(function(err){
        res.send(err);
    });
};
