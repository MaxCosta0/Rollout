const db = require('../config/connection');

const Usuario = db.sequelize.define('usuario', {
    Nome: {type: db.Sequelize.STRING, allowNull: false},
    Matricula: {type: db.Sequelize.STRING, allowNull: false},
    Email: {type: db.Sequelize.STRING, allowNull: false},
    Senha: {type: db.Sequelize.STRING, allowNull: false},
    isVerified: {type: db.Sequelize.BOOLEAN, allowNull: false},
    loggedin: {type: db.Sequelize.BOOLEAN, allowNull: false},
    userType: {type: db.Sequelize.STRING, allowNull: false}
}, {
    freezeTableName: true
});

module.exports = Usuario;
