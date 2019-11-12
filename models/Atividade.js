const db = require('./connection');

const Atividade = db.sequelize.define('atividade', {
    Nome: {type: db.Sequelize.STRING, allowNull: false},
    Escopo: {type: db.Sequelize.STRING},
    Tipo: {type: db.Sequelize.STRING, allowNull: false},
}, {
    freezeTableName: true
});

module.exports = Atividade;