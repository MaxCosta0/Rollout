"use strict"
const Status = require('../models/status');

module.exports = {
    create(req, res) {
        const { Descricao } = req.body
        Status.create({ Descricao })
            .then( status => res.json(status))
            .catch( err => res.json(err))
    },

    findOne(req, res) {
        const { id } = req.params
        Status.findOne({where: {id} })
            .then( status => res.json(status))
            .catch( err => res.json(err))
    },
    
    findAll(req, res) {
        const limit = 10; 
        const offset = (parseInt(req.params.page) - 1) * limit;

        Status.findAll({
            offset,
            limit
        })
            .then( status => res.json(status))
            .catch( err => res.json(err))
    },

    update(req, res) {
        const { Descricao } = req.body
        const { id } = req.params
        Status.update({ Descricao }, {where: {id}})
            .then( status => {
                if (status[0] !== 0)
                    res.status(200).json({ result: "Status atualizado com sucesso."})
                else
                    res.status(200).json({ result: "Status não encontrado."})
            })
            .catch( err => res.json(err))
    },

    delete(req, res) {
        const { id } = req.params
        Status.destroy({where: {id}})
            .then( status => {
                if (status !== 0)
                    res.status(200).json({ result: "Status deletado com sucesso."})
                else
                    res.status(200).json({ result: "Status não encontrado."})
            })
            .catch( err => res.json(err))
    }
}
