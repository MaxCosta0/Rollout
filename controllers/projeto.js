"use strict"
const Projeto = require('../models/projeto');

module.exports = {
    create(req, res) {
        const { Nome, Escopo, statusId } = req.body
        Projeto.create({ Nome, Escopo, statusId })
            .catch(function(err){
                res.send(err);
            })
        res.json({createdProject: true});
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
        var totalPage
        
        Projeto.findAll()
            .then( projetos => {
                totalPage = (Math.ceil(projetos.length/limit))
                Projeto.findAll({
                    offset,
                    limit
                })
                    .then( projetos1 => {
                        console.log("teste")
                        // let totalPage = (Math.ceil(projetos.length/limit))
                        var dataPage = {totalPage: totalPage};
                        var obj = Object.assign({}, projetos1, dataPage);
                        res.json(obj)
                    })
            })
            .catch( err => res.json(err))
    },

    update(req, res) {
        const { Nome, Escopo, statusId } = req.body
        const { id } = req.params
        Projeto.update({Nome, Escopo, statusId }, {where: {id}})
            .then( projeto => {
                if (projeto[0] !== 0)
                    res.status(200).json({ updatedProject: true, result: "Projeto atualizado com sucesso."})
                else
                    res.status(200).json({ updatedProject: false, result: "Projeto não encontrado."})
            })
            .catch( err => res.json(err))
    },

    delete(req, res) {
        const { id } = req.params
        Projeto.destroy({where: {id}})
            .then( projeto => {
                if (projeto !== 0)
                    res.status(200).json({ delectedProject: true, result: "Projeto deletado com sucesso.", id: id})
                else
                    res.status(200).json({ delectedProject: false, result: "Projeto não encontrado."})
            })
            .catch( err => res.json(err))
    }
}
