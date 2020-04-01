"use strict"
const Estacao = require('../models/estacao');

module.exports = {
    create(req, res) {
        const { Nome, Escopo, cidadeId, projetoId, statusId } = req.body
        Estacao.create({ Nome, Escopo, cidadeId, projetoId, statusId })
            .catch(function(err){
                res.send(err);
            })
        res.json({estacaoCriada: true})
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
        var projetoId = req.params.projetoId;
        var length;

        Estacao.findAll({
            where: {
                projetoId: projetoId
            },
            offset,
            limit
        })
            .then( estacoes => {
                Estacao.findAll({
                    where:{
                        projetoId: projetoId
                    }
                })
                .then(estacoes1 => {
                    length = estacoes1.length;
                    let estacaoQtdCurrentPage = {estacaoQtdCurrentPage: estacoes.length};
                    let totalPage = Math.ceil(length / limit)
                    var dataPage = {totalPage: totalPage}
                    var obj  = Object.assign({}, estacoes, dataPage, estacaoQtdCurrentPage)
                    res.json(obj)
                })
            })
            .catch( err => res.json(err))
    },

    update(req, res) {
        const {  Nome, Escopo, cidadeId, projetoId, statusId } = req.body
        const { id } = req.params
        Estacao.update({  Nome, Escopo, cidadeId, projetoId, statusId }, {where: {id}})
            .then( estacao => {
                if (estacao[0] !== 0)
                    res.status(200).json({ updatedEstacao: true, result: "Estação atualizada com sucesso."})
                else
                    res.status(200).json({ updatedEstacao: false, result: "Estação não encontrada."})
            })
            .catch( err => res.json(err))
    },

    delete(req, res) {
        const { id } = req.params
        Estacao.destroy({where: {id}})
            .then( estacao => {
                if (estacao !== 0)
                    res.status(200).json({ estacaoDeleted: true, result: "Estação deletada com sucesso."})
                else
                    res.status(200).json({ estacaoDeleted: false, result: "Estação não encontrada."})
            })
            .catch( err => res.json(err))
    }
}
