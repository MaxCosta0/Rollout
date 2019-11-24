## Controllers

Esta pasta contém o core da nossa aplicação. Aqui estao as features do CRUD de cada uma das entidades do BD. Cada um dos arquivos .js nesta pasta possui codigos semelhantes aos codigos abaixo, vamos utilizar o codigo da entidade **usuario** como exemplo:

```JavaScript
exports.create = function(req, res){
    Usuario.create({
        Nome: req.body.Nome,
        Matricula: req.body.Matricula,
        Email: req.body.Email,
        Senha: req.body.Senha
    }).then(function(usuario){
        res.send(usuario);
    }).catch(function(err){
        res.send(err);
    });
};
```
O codigo acima cria um usuario no banco de dados utilizando o Sequelize ("*toda a manipulação do banco é feita com esse carinha*"). Note que há um then e um catch no codigo, essas palavrinhas sao metodos que retornam [promisses](https://medium.com/dev-bits/writing-neat-asynchronous-node-js-code-with-promises-32ed3a4fd098) de sucesso e erro respectivamente.

```JavaScript
exports.findOne = function(req, res){
    Usuario.findById(req.params.id).then(function(usuario){
        res.send(usuario);
    }).catch(function(err){
        res.send(err);
    });
};
```
Este código nos retorna um usuario em especifico ao passarmos sua id como parametro na url. A chamada dessa função seria: http://localhost:3000/usuarios/id. 

```JavaScript
exports.findAll = function(req, res){
    Usuario.findAll().then(function(usuarios){
        res.send(usuarios);
    }).catch(function(err){
        res.send(err);
    });
};
```
Ja este codigo nos retorna todos os usuarios cadastrados no banco de dados sem passarmos nada como parametro. Sua chamada seria: http://localhost:3000/usuarios. Note que não passamos a id na url.

```JavaScript
exports.update = function(req, res){
    Usuario.update({
        Nome: req.body.Nome,
        Matricula: req.body.Matricula,
        Email: req.body.Email,
        Senha: req.body.Senha
    }, {where: {id: req.params.id}}).then(function(){
        res.status(200).send('Usuario atualizado com sucesso.');
    }).catch(function(err){
        res.send(err);
    });
};
```
Como deve ter notado, o codigo acima atualiza o cadastro do usuario. Este é muito parecido como codigo para criar o usuario no banco, com uma unica diferença de que passamos a id do usuario que queremos atualizar de maneira semelhante à chamada do codigo para encontrar o usuario.

```JavaScript
exports.delete = function(req, res){
    Usuario.destroy({
        where: {id: req.params.id}
    }).then(function(){
        res.status(200).send('Usuario deletado com sucesso');
    }).catch(function(err){
        res.send(err);
    });
};
```
E por ultimo mas nao menos importante, temos o codigo para excluir um usuario do banco de dados. Também devemos passar a id do usuario pela url para excluir o mesmo.