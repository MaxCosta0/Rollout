'use strict';

const express = require('express');
const BodyParser = require('body-parser');
const helmet = require('helmet')

const app = express();
app.disable('X-Powered-By') // para segurança do express, desabilita cabeçalho X-Powered-By

const usuario = require('./routes/usuario')
const estado = require('./routes/estado')

let port = 3000;

app.use(helmet()) // para segurança do express contra vunerabilidades http
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true}));

app.get('/', function(req, res){
    res.send('Alright here.');
});

app.use(usuario);
app.use(estado);

app.listen(port, function(err){
    if(!err){
        console.log(`App running at: http://localhost:${port}/`);
    }else{
        console.log(err);
    }
});