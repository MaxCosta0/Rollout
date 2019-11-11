const db = require('./connection');

const Estado = db.sequelize.define('estados', {
    Nome: {type: db.Sequelize.STRING, allowNull: false}
});

module.exports = Estado;