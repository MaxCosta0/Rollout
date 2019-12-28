const db = require('../config/connection');

const Usuario = db.sequelize.define('usuario', {
    Nome: {type: db.Sequelize.STRING, allowNull: false},
    Matricula: {type: db.Sequelize.STRING, allowNull: false},
    Email: {type: db.Sequelize.STRING, allowNull: false},
    Senha: {type: db.Sequelize.STRING, allowNull: false},
<<<<<<< HEAD
    isVerified: {type: db.Sequelize.BOOLEAN, allowNull: false}
=======
    isVerified: {type: db.Sequelize.BOOLEAN, allowNull: false},
    loggedin: {type: db.Sequelize.BOOLEAN, allowNull: false}
>>>>>>> 0aecb0535a828a5b8b92a6bd2654897324c85de4
}, {
    freezeTableName: true
});

module.exports = Usuario;
