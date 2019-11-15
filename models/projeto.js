const db = require('../config/connection');

const Projeto = db.sequelize.define('projeto', {
    Nome: {type: db.Sequelize.STRING, allowNull: false},
    Escopo: {type: db.Sequelize.STRING}
}, {
    freezeTableName: true
});

module.exports = Projeto;