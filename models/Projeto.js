const db = require('./connection');
const Status = require('./Status');

const Projeto = db.sequelize.define('projetos', {
    Nome: {type: db.Sequelize.STRING, allowNull: false},
    Escopo: {type: db.Sequelize.STRING}
});

module.exports = Projeto;