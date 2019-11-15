const db = require('../config/connection');

const Estado = db.sequelize.define('estado', {
    Nome: {type: db.Sequelize.STRING, allowNull: false}
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = Estado;