'use strict';
const Sequelize = require('sequelize');

const sequelize = new Sequelize('rollout', 'root', 'teste123', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
};
