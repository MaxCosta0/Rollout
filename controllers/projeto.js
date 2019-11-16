const Projeto = require('../models/projeto');

exports.create = function(req, res){
    Projeto.create({
        Nome: req.body.Nome,
        Escopo: req.body.Escopo
    }).then(function(projeto){
        res.send(projeto);
    }).catch(function(err){
        res.send(err);
    });
};

exports.findOne = function(req, res){
    Projeto.findById(req.params.id).then(function(projeto){
        res.send(projeto);
    }).catch(function(err){
        res.send(err);
    });
};

exports.findAll = function(req, res){
    Projeto.findAll().then(function(projetos){
        res.send(projetos);
    }).catch(function(err){
        res.send(err);
    });
};

exports.update = function(req, res){
    Projeto.update({
        Nome: req.body.Nome,
        Escopo: req.body.Escopo
    }, {where: {id: req.params.id}}).then(function(projeto){
        res.status(200).send('Projeto atualizado com sucesso.');
    }).catch(function(err){
        res.send(err);
    });
};

exports.delete = function(req, res){
    Projeto.destroy({
        where: {id: req.params.id}
    }).then(function(req, res){
        res.status(200).send('Projeto deletado com sucesso.');
    }).catch(function(err){
        res.send(err);
    });
};