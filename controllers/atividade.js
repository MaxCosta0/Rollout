"use strict"
const Atividade = require('../models/atividade')

module.exports = {
    create(req, res) {
        const { Nome, Escopo, Tipo, estacaoId, statusId } = req.body
        Atividade.create({ Nome, Escopo, Tipo, estacaoId, statusId })
            .catch(function(err){
                res.send(err);
            })
        res.json({atividadeCriada: true})
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
        var estacaoId = req.params.estacaoId;

        Atividade.findAll({
            where:{
                estacaoId: estacaoId
            },
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
                    res.status(200).json({ atividateUpdate: true, result: "Atividade atualizada com sucesso."})
                else
                    res.status(200).json({ atividateUpdate: false, result: "Atividade não encontrada."})
            })
            .catch( err => res.json(err))
    },

    delete(req, res) {
        const { id } = req.params
        Atividade.destroy({where: {id}})
            .then( atividade => {
                if (atividade !== 0)
                    res.status(200).json({ atividadeDeletada: true, result: "Atividade deletada com sucesso."})
                else
                    res.status(200).json({ atividadeDeletada: false, result: "Atividade não encontrada."})
            })
            .catch( err => res.json(err))
    }
}
