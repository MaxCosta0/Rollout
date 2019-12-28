"use strict"
const Atividade = require('../models/atividade')

module.exports = {
    create(req, res) {
        const { Nome, Escopo, Tipo, estacaoId, statusId } = req.body
        Atividade.create({ Nome, Escopo, Tipo, estacaoId, statusId })
            .then( atividade => res.json(atividade))
            .catch( err => res.json(err))
    },

    findOne(req, res) {
        const { id } = req.params
        Atividade.findOne({where:{ id }})
            .then( atividade => res.json(atividade))
            .catch( err => res.json(err))
    },
    
    findAll(req, res) {
        const limit = 10; 
        const offset = (parseInt(req.params.page) - 1) * limit;

        Atividade.findAll({
            offset,
            limit
        })
            .then( atividades => res.json(atividades))
            .catch( err => res.json(err))
    },

    update(req, res) {
        const { Nome, Escopo, Tipo, estacaoId, statusId } = req.body
        const { id } = req.params
        Atividade.update({ Nome, Escopo, Tipo, estacaoId, statusId }, {where: {id}})
            .then( atividade => {
                if (atividade[0] !== 0)
                    res.status(200).json({ result: "Atividade atualizada com sucesso."})
                else
                    res.status(200).json({ result: "Atividade não encontrada."})
            })
            .catch( err => res.json(err))
    },

    delete(req, res) {
        const { id } = req.params
        Atividade.destroy({where: {id}})
            .then( atividade => {
                if (atividade !== 0)
                    res.status(200).json({ result: "Atividade deletada com sucesso."})
                else
                    res.status(200).json({ result: "Atividade não encontrada."})
            })
            .catch( err => res.json(err))
    }
}
