const Atividade = require('./Atividade');
const Cidade = require('./Cidade');
const Estacao = require('./Estacao');
const Estado = require('./Estado');
const Projeto = require('./Projeto');
const Status = require('./Status');
const Usuario = require('./Usuario');

const db = require('./connection');

Status.hasMany(Projeto, {foreignKey: {allowNull: false}});
Status.hasMany(Estacao, {foreignKey: {allowNull: false}});
Status.hasMany(Atividade, {foreignKey: {allowNull: false}});
Projeto.hasMany(Estacao, {foreignKey: {allowNull: false}});
Estacao.hasMany(Atividade, {foreignKey: {allowNull: false}});
Cidade.hasMany(Estacao, {foreignKey: {allowNull: false}});
Estado.hasMany(Cidade, {foreignKey: {allowNull: false}});

db.sequelize.sync({force: true});
