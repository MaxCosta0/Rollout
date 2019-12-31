const db = require('../config/connection');
const Atividade = require('../models/atividade');

const Estacao = db.sequelize.define('estacao', {
    Nome: {type: db.Sequelize.STRING, allowNull: false},
    Escopo: {type: db.Sequelize.STRING}
}, {
    freezeTableName: true
});
Estacao.hasMany(Atividade, {foreignKey: {allowNull: false}});

module.exports = Estacao;