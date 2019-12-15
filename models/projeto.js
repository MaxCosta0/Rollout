const db = require('../config/connection');
const Estacao = require('../models/estacao');

const Projeto = db.sequelize.define('projeto', {
    Nome: {type: db.Sequelize.STRING, allowNull: false},
    Escopo: {type: db.Sequelize.STRING}
}, {
    freezeTableName: true
});
Projeto.hasMany(Estacao, {foreignKey: {allowNull: false}});

module.exports = Projeto;