const db = require('../config/connection');
const Estacao = require('../models/estacao')
const Projeto = require('../models/projeto');
const Atividade = require('../models/atividade');

const Status = db.sequelize.define('status', {
    Descricao: {type: db.Sequelize.STRING, allowNull: false},
}, {
    timestamps: false,
    freezeTableName: true
});

Status.hasMany(Projeto, {foreignKey: {allowNull: false}});
Status.hasMany(Estacao, {foreignKey: {allowNull: false}});
Status.hasMany(Atividade, {foreignKey: {allowNull: false}});

module.exports = Status;