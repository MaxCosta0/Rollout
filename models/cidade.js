const db = require('../config/connection');
const Estacao = require('../models/estacao');

const Cidade = db.sequelize.define('cidade', {
    Nome: {type: db.Sequelize.STRING, allowNull: false}
}, {
    timestamps: false,
    freezeTableName: true
});
Cidade.hasMany(Estacao, {foreignKey: {allowNull: false}});

module.exports = Cidade;