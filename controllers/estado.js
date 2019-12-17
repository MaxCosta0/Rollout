"use strict"
const Estado = require('../models/estado')

module.exports = {
    create(req, res) {
        const { Nome } = req.body
        Estado.create({ Nome })
            .then( estado => res.json(estado))
            .catch( err => res.json(err))
    },

    findOne(req, res) {
        const { id } = req.params
        Estado.findOne({ id })
            .then( estado => res.json(estado))
            .catch( err => res.json(err))
    },
    
    findAll(req, res) {
        const limit = 5; 
        const offset = (parseInt(req.params.page) - 1) * limit;

        Estado.findAll({
            offset,
            limit
        })
            .then( estados => res.json(estados))
            .catch( err => res.json(err))
    },

    update(req, res) {
        const { Nome } = req.body
        const { id } = req.params
        Estado.update({ Nome }, {where: {id}})
            .then( estado => {
                if (estado[0] !== 0)
                    res.status(200).json({ result: "Estado atualizado com sucesso."})
                else
                    res.status(200).json({ result: "Estado não encontrado."})
            })
            .catch( err => res.json(err))
    },

    delete(req, res) {
        const { id } = req.params
        Estado.destroy({where: {id}})
            .then( estado => {
                if (estado !== 0)
                    res.status(200).json({ result: "Estado deletado com sucesso."})
                else
                    res.status(200).json({ result: "Estado não encontrado."})
            })
            .catch( err => res.json(err))
    }
}
