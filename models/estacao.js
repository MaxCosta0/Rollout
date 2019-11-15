const db = require('../config/connection');

const Estacao = db.sequelize.define('estacao', {
    Nome: {type: db.Sequelize.STRING, allowNull: false},
    Escopo: {type: db.Sequelize.STRING}
}, {
    freezeTableName: true
});

module.exports = Estacao;