const Estacao = require('../models/estacao');

exports.create = function(req, res){
   Estacao.create({
        Nome: req.body.Nome,
        Escopo: req.body.Escopo
    }).then(function(estacao){
        res.send(estacao);
    }).catch(function(err){
        res.send(err);
    });
};

exports.findOne = function(req, res){
    Estacao.findById(req.params.id).then(function(estacao){
        res.send(estacao);
    }).catch(function(err){
        res.send(err);
    });
};

exports.findAll = function(req, res){
    Estacao.findAll().then(function(estacoes){
        res.send(estacoes);
    }).catch(function(err){
        res.send(err);
    });
};

exports.update = function(req, res){
    Estacao.update({
        Nome: req.body.Nome,
        Escopo: req.body.Escopo
    }, {where: {id: req.params.id}}).then(function(){
        res.status(200).send('Estacao atualizada com sucesso.');
    }).catch(function(err){
        res.send(err);
    });
};

exports.delete = function(req, res){
    Estacao.destroy({
        where: {id: req.params.id}
    }).then(function(){
        res.status(200).send('Estacao deletada com sucesso');
    }).catch(function(err){
        res.send(err);
    });
};
