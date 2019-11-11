const db = require('./connection');

const Atividade = db.sequelize.define('atividades', {
    Nome: {type: db.Sequelize.STRING, allowNull: false},
    Escopo: {type: db.Sequelize.STRING},
    Tipo: {type: db.Sequelize.STRING, allowNull: false}
});

module.exports = Atividade;