const db = require('./connection');

const Usuario = db.sequelize.define('usuarios', {
    Nome: {type: db.Sequelize.STRING, allowNull: false},
    Matricula: {type: db.Sequelize.STRING, allowNull: false},
    Email: {type: db.Sequelize.STRING, allowNull: false},
    Senha: {type: db.Sequelize.STRING, allowNull: false}
});

module.exports = Usuario;
