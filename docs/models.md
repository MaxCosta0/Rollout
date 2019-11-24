# Models

Pasta que contem os modelos de todas as entidades do banco de dados criado utilizando [Sequelize](https://sequelize.org/v5/). Codigo exemplo:

```JavaScript
const db = require('../config/connection');

const Usuario = db.sequelize.define('usuario', {
    Nome: {type: db.Sequelize.STRING, allowNull: false},
    Matricula: {type: db.Sequelize.STRING, allowNull: false},
    Email: {type: db.Sequelize.STRING, allowNull: false},
    Senha: {type: db.Sequelize.STRING, allowNull: false}
}, {
    freezeTableName: true
});

module.exports = Usuario;
```
O codigo modela a entidade usuario (e o atribui esse modelo à constante Usuario para que possa ser exportada e outra parte do projeto fazer uso do mesmo) com os atributos: **Nome**, **Matricula**, **Email** e **Senha**. O pedaço "*freezeTableName: true*" apenas diz para o Sequelize manter o nome escolhido ("usuario"), caso contrario a ORM vai tentar mudar esse nome para sua versao no plural ("usuarios" nesse caso).