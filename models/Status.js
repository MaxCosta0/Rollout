const db = require('./connection');

const Status = db.sequelize.define('status', {
    Descricao: {type: db.Sequelize.STRING, allowNull: false}
});

module.exports = Status;