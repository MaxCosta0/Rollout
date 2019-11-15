const db = require('../config/connection');

const Cidade = db.sequelize.define('cidade', {
    Nome: {type: db.Sequelize.STRING, allowNull: false}
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = Cidade;