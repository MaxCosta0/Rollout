const db = require('../config/connection');

const Status = db.sequelize.define('status', {
    Descricao: {type: db.Sequelize.STRING, allowNull: false}
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = Status;