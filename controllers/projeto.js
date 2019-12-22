"use strict"
const Projeto = require('../models/projeto');

module.exports = {
    create(req, res) {
        const { Nome, Escopo, statusId } = req.body
        Projeto.create({ Nome, Escopo, statusId })
            .then( projeto => res.json(projeto))
            .catch( err => res.json(err))
    },

    findOne(req, res) {
        const { id } = req.params
        Projeto.findOne({where: { id }})
            .then( projeto => res.json(projeto))
            .catch( err => res.json(err))
    },
    
    findAll(req, res) {
        const limit = 10; 
        const offset = (parseInt(req.params.page) - 1) * limit;

        Projeto.findAll({
            offset,
            limit
        })
            .then( projetos => res.json(projetos))
            .catch( err => res.json(err))
    },

    update(req, res) {
        const { Nome, Escopo, statusId } = req.body
        const { id } = req.params
        Projeto.update({Nome, Escopo, statusId }, {where: {id}})
            .then( projeto => {
                if (projeto[0] !== 0)
                    res.status(200).json({ result: "Projeto atualizado com sucesso."})
                else
                    res.status(200).json({ result: "Projeto não encontrado."})
            })
            .catch( err => res.json(err))
    },

    delete(req, res) {
        const { id } = req.params
        Projeto.destroy({where: {id}})
            .then( projeto => {
                if (projeto !== 0)
                    res.status(200).json({ result: "Projeto deletado com sucesso."})
                else
                    res.status(200).json({ result: "Projeto não encontrado."})
            })
            .catch( err => res.json(err))
    }
}
