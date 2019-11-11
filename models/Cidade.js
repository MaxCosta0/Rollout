const db = require('./connection');

const Cidade = db.sequelize.define('cidades', {
    Nome: {type: db.Sequelize.STRING, allowNull: false}
});

module.exports = Cidade;