const db = require('./connection');
const Status = require('./Status');
const Projeto = require('./Projeto');
const Cidade = require('./Cidade');

const Estacao = db.sequelize.define('estacao', {
    Nome: {type: db.Sequelize.STRING, allowNull: false},
    Escopo: {type: db.Sequelize.STRING}
}, {
    freezeTableName: true
});

module.exports = Estacao;