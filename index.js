"use strict"
const express = require('express');
const BodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// npm intall cors

const app = express();

const usuario = require('./routes/usuario');
const projeto = require('./routes/projeto');
const status = require('./routes/status');
const estacao = require('./routes/estacao');
const atividade = require('./routes/atividade');
const cidade = require('./routes/cidade');
const estado = require('./routes/estado');

app.disable('X-Powered-By') // para segurança do express, desabilita cabeçalho X-Powered-By

app.use(helmet()) // para segurança do express contra vunerabilidades http
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true}));
//using cors
app.use(cors());
app.use(cookieParser());

app.use(usuario);
app.use(projeto);
app.use(status);
app.use(estacao);
app.use(atividade);
app.use(cidade);
app.use(estado);

const alunos = [{
    nome: 'a1',
    idade: 12
}]

app.get('/usuario', function (req, res) { //endereco da requisicao onde e retornado hello world
    res.send(alunos)
})

let port = 3000;
app.listen(port, function(err){
    if(!err){
        console.log(`App running at: http://localhost:${port}/`);
    }else{
        console.log(err);
    }
});