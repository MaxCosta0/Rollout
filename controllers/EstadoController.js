/**
 * @author Breno Henrique de Oliveira Ferreira
 * @since Qual versão está aplicação? ~1.1 
 * @date Nov/23/2019
*/

const Estado = require('../models/estado')

module.exports = {
    create(req, res) {
        const { Nome } = req.body
        Estado.create({ Nome })
            .then( estado => res.json(estado))
            .catch( err => res.json(err))
    },

    details(req, res) {
        const { id } = req.params
        Estado.findOne({ id })
            .then( estado => res.json(estado))
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