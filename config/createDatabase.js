const Atividade = require('../models/atividade');
const Cidade = require('../models/cidade');
const Estacao = require('../models/estacao');
const Estado = require('../models/estado');
const Projeto = require('../models/projeto');
const Status = require('../models/status');
const Usuario = require('../models/usuario');

const db = require('./connection');

Cidade.hasMany(Estacao, {foreignKey: {allowNull: false}});
Estacao.hasMany(Atividade, {foreignKey: {allowNull: false}});
Estado.hasMany(Cidade, {foreignKey: {allowNull: false}});
Projeto.hasMany(Estacao, {foreignKey: {allowNull: false}});
Status.hasMany(Projeto, {foreignKey: {allowNull: false}});
Status.hasMany(Estacao, {foreignKey: {allowNull: false}});
Status.hasMany(Atividade, {foreignKey: {allowNull: false}});


db.sequelize.sync({force: true});
