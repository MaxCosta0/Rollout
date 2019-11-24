# Config

## connection.js

Arquivo .js onde é estabalecida a conexão com o banco de dados utilizando o [Sequelize](https://sequelize.org/v5/manual/getting-started.html). Abaixo temos o codigo responsável pela conexão 

```JavaScript
const sequelize = new Sequelize('rollout', 'root', 'Password', {
    host: 'localhost',
    dialect: 'mysql'
});
```

* Nome do Banco de dados: rollout "**O Sequelize apenas manipula o banco de dados, logo o mesmo deve ser criado anteriormente**"
* Usuario: root
* Senha: Password "**Coloque a Senha do seu usuario root**"
* host: localhost
* dialect: mysql "**SGBD que será utilizado. O Sequelize trabalha com varios SGBDs, portanto deve-se sempre deixar explicito qual sera utilizado.**" 

## createDatabase.js

Utiliza o Sequelize para criar [Relações](https://sequelize.org/v5/manual/associations.html) entre as entidades do banco de dados. Como exemplo temos o código abaixo:

```JavaScript
Status.hasMany(Projeto, {foreignKey: {allowNull: false}});
```
que relaciona um Status à varios Projetos. O relacionamento de 1 para muitos acima força a criação de uma chave estrangeira que liga Status (Source) e Projeto (Target)*. 
*Nota: A chave estrangeira no caso do relacionamento 1 para muitos sempre é adicionada no Target.