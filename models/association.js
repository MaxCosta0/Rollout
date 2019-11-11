const Atividade = require('./Atividade');
const Cidade = require('./Cidade');
const Estacao = require('./Estacao');
const Estado = require('./Estado');
const Projeto = require('./Projeto');
const Status = require('./Status');

const db = require('./connection');

Status.hasMany(Projeto);
Status.hasMany(Estacao);
Status.hasMany(Atividade);
Projeto.hasMany(Estacao);
Estacao.hasMany(Atividade);
Cidade.hasMany(Estacao);
Estado.hasMany(Cidade);

db.sequelize.sync({force: true});
