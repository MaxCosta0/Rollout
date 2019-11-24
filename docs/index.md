# index.js

Base da API onde sao "*importadas*" as principais ferramentas para a construção da mesma.

* [express](https://expressjs.com/en/api.html#app)
* [body-parser](https://medium.com/@adamzerner/how-bodyparser-works-247897a93b90)

Também é onde definimos uma porta onde nosso server vai "*rodar*" atraves do codigo abaixo

```JavaScript
app.listen(port, function(err){
    if(!err){
        console.log(`App running at: http://localhost:${port}/`);
    }else{
        console.log(err);
    }
});
```