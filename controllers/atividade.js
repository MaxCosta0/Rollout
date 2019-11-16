const Atividade = require('../models/atividade');

exports.create = function(req, res){
   Atividade.create({
        Nome: req.body.Nome,
        Escopo: req.body.Escopo,
        Tipo: req.body.Tipo
    }).then(function(atividade){
        res.send(atividade);
    }).catch(function(err){
        res.send(err);
    });
};

exports.findOne = function(req, res){
    Atividade.findById(req.params.id).then(function(atividade){
        res.send(atividade);
    }).catch(function(err){
        res.send(err);
    });
};

exports.findAll = function(req, res){
    Atividade.findAll().then(function(atividades){
        res.send(atividades);
    }).catch(function(err){
        res.send(err);
    });
};

exports.update = function(req, res){
    Atividade.update({
        Nome: req.body.Nome,
        Escopo: req.body.Escopo,
        Tipo: req.body.Tipo
    }, {where: {id: req.params.id}}).then(function(){
        res.status(200).send('Atividade atualizada com sucesso.');
    }).catch(function(err){
        res.send(err);
    });
};

exports.delete = function(req, res){
    Atividade.destroy({
        where: {id: req.params.id}
    }).then(function(){
        res.status(200).send('Ativiidade deletada com sucesso');
    }).catch(function(err){
        res.send(err);
    });
};
