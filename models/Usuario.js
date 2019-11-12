const db = require('./connection');

const Usuario = db.sequelize.define('usuario', {
    Nome: {type: db.Sequelize.STRING, allowNull: false},
    Matricula: {type: db.Sequelize.STRING, allowNull: false},
    Email: {type: db.Sequelize.STRING, allowNull: false},
    Senha: {type: db.Sequelize.STRING, allowNull: false}
}, {
    freezeTableName: true
});

module.exports = Usuario;
