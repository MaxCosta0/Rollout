const Status = require('../models/status');

exports.create = function(req, res){
    Status.create({
        Descricao: req.body.Descricao
    }).then(function(status){
        res.send(status);
    }).catch(function(err){
        res.send(err);
    });
};

exports.findOne = function(req, res){
    Status.findById(req.params.id).then(function(status){
        res.send(status);
    }).catch(function(err){
        res.send(err);
    });
};

exports.findAll = function(req, res){
    Status.findAll().then(function(status){
        res.send(status);
    }).catch(function(err){
        res.send(err);
    });
};

exports.update = function(req, res){
    Status.update({
        Descricao: req.body.Descricao
    }, {where: {id: req.params.id}}).then(function(status){
        res.status(200).send('Status atualizado com sucesso.');
    }).catch(function(err){
        res.send(err);
    });
};

exports.delete = function(req, res){
    Status.destroy({
        where: {id: req.params.id}
    }).then(function(status){
        res.status(200).send('Status deletado com sucesso');
    }).catch(function(err){
        res.send(err);
    });
};