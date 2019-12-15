const db = require('../config/connection');
const Cidade = require('../models/cidade');

const Estado = db.sequelize.define('estado', {
    Nome: {type: db.Sequelize.STRING, allowNull: false}
}, {
    timestamps: false,
    freezeTableName: true
});
Estado.hasMany(Cidade, {foreignKey: {allowNull: false}});

module.exports = Estado;