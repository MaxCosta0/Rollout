"use strict"
const Estacao = require('../models/estacao');

module.exports = {
    create(req, res) {
        const { Nome, Escopo, cidadeId, projetoId, statusId } = req.body
        Estacao.create({ Nome, Escopo, cidadeId, projetoId, statusId })
            .then( estacao => res.json(estacao))
            .catch( err => res.json(err))
    },

    findOne(req, res) {
        const { id } = req.params
        Estacao.findOne({where: { id }})
            .then( estacao => res.json(estacao))
            .catch( err => res.json(err))
    },
    
    findAll(req, res) {
        const limit = 10; 
        const offset = (parseInt(req.params.page) - 1) * limit;

        Estacao.findAll({
            offset,
            limit
        })
            .then( estacoes => res.json(estacoes))
            .catch( err => res.json(err))
    },

    update(req, res) {
        const {  Nome, Escopo, cidadeId, projetoId, statusId } = req.body
        const { id } = req.params
        Estacao.update({  Nome, Escopo, cidadeId, projetoId, statusId }, {where: {id}})
            .then( estacao => {
                if (estacao[0] !== 0)
                    res.status(200).json({ result: "Estação atualizaa com sucesso."})
                else
                    res.status(200).json({ result: "Estação não encontrada."})
            })
            .catch( err => res.json(err))
    },

    delete(req, res) {
        const { id } = req.params
        Estacao.destroy({where: {id}})
            .then( estacao => {
                if (estacao !== 0)
                    res.status(200).json({ result: "Estação deletada com sucesso."})
                else
                    res.status(200).json({ result: "Estação não encontrada."})
            })
            .catch( err => res.json(err))
    }
}
