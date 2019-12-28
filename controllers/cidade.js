"use strict"
const Cidade = require('../models/cidade');

module.exports = {
    create(req, res) {
        const { Nome, estadoId } = req.body
        Cidade.create({ Nome, estadoId })
            .then( cidade => res.json(cidade))
            .catch( err => res.json(err))
    },

    findOne(req, res) {
        const { id } = req.params
        Cidade.findOne({where: { id }})
            .then( cidade => res.json(cidade))
            .catch( err => res.json(err))
    },
    
    findAll(req, res) {
        const limit = 10; 
        const offset = (parseInt(req.params.page) - 1) * limit;

        Cidade.findAll({
            offset,
            limit
        })
            .then( cidades => res.json(cidades))
            .catch( err => res.json(err))
    },

    update(req, res) {
        const { Nome, estadoId } = req.body
        const { id } = req.params
        Cidade.update({ Nome, estadoId }, {where: {id}})
            .then( cidade => {
                if (cidade[0] !== 0)
                    res.status(200).json({ result: "Cidade atualizaa com sucesso."})
                else
                    res.status(200).json({ result: "Cidade não encontrada."})
            })
            .catch( err => res.json(err))
    },

    delete(req, res) {
        const { id } = req.params
        Cidade.destroy({where: {id}})
            .then( cidade => {
                if (cidade !== 0)
                    res.status(200).json({ result: "Cidade deletada com sucesso."})
                else
                    res.status(200).json({ result: "Cidade não encontrada."})
            })
            .catch( err => res.json(err))
    }
}