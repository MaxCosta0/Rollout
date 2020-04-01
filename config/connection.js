'use strict';
const Sequelize = require('sequelize');

const sequelize = new Sequelize('rollout', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
};
