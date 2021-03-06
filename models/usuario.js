const db = require('../config/connection');

const Usuario = db.sequelize.define('usuario', {
    Nome: {type: db.Sequelize.STRING, allowNull: false},
    Matricula: {type: db.Sequelize.STRING, allowNull: false},
    Email: {type: db.Sequelize.STRING, allowNull: false},
    Senha: {type: db.Sequelize.STRING, allowNull: false},
    isVerified: {type: db.Sequelize.BOOLEAN, allowNull: false},
    isVerifiedByAdmin: {type: db.Sequelize.BOOLEAN, allowNull: false},
    refusedByAdmin: {type: db.Sequelize.BOOLEAN, allowNull: false},
    loggedin: {type: db.Sequelize.BOOLEAN, allowNull: false},
    userType: {type: db.Sequelize.STRING, allowNull: false},
    SenhaTemp: {type: db.Sequelize.STRING, allowNull: true}
}, {
    freezeTableName: true
});

module.exports = Usuario;
