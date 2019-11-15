'use strict';

const express = require('express');
const BodyParser = require('body-parser');
const app = express();
const usuario = require('./routes/usuario')

let port = 3000;

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true}));

app.get('/', function(req, res){
    res.send('Alright here.');
});

app.use(usuario);

app.listen(port, function(err){
    if(!err){
        console.log(`App running at: http://localhost:${port}/`);
    }else{
        console.log(err);
    }
});