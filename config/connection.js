'use strict';

const Sequelize = require('sequelize');
const sequelize = new Sequelize('rollout', 'root', '12345', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
};