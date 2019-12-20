"use strict"
const Usuario = require('../models/usuario');

module.exports = {
    create(req, res) {
        const { Nome, Matricula, Email, Senha } = req.body
        Usuario.create({ Nome, Matricula, Email, Senha })
            .then( usuario => res.json(usuario))
            .catch( err => res.json(err))
    },

    findOne(req, res) {
        //const { id } = req.params
        Usuario.findOne({where: {id: req.params.id}})
            .then( usuario => res.json(usuario))
            .catch( err => res.json(err))
    },
    
    findAll(req, res) {
        const limit = 10; 
        const offset = (parseInt(req.params.page) - 1) * limit;

        Usuario.findAll({
            offset,
            limit
        })
            .then( usuarios => res.json(usuarios))
            .catch( err => res.json(err))
    },

    update(req, res) {
        const { Nome, Matricula, Email, Senha } = req.body
        const { id } = req.params
        Usuario.update({ Nome, Matricula, Email, Senha }, {where: {id}})
            .then( usuario => {
                if (usuario[0] !== 0)
                    res.status(200).json({ result: "Usuário atualizado com sucesso."})
                else
                    res.status(200).json({ result: "Usuário não encontrado."})
            })
            .catch( err => res.json(err))
    },

    delete(req, res) {
        const { id } = req.params
        Usuario.destroy({where: {id}})
            .then( usuario => {
                if (usuario !== 0)
                    res.status(200).json({ result: "Usuário deletado com sucesso."})
                else
                    res.status(200).json({ result: "Usuário não encontrado."})
            })
            .catch( err => res.json(err))
    }
}
