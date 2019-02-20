# Babel

## Como configurar:

Primeiramente, cria-se um diretório para o projeto. Para iniciar um projeto, usamos o comando:

```
$ npm init
```

Esse comando cria um arquivo chamado *```package.json```*. Em seguida, vamos instalar o que for necessário para usar o Babel:

```
$ npm install --global babel-cli
$ npm install babel-preset-es2015 --save-dev
```
Dentro do diretório do projeto, vamos criar dois novos diretórios:

- *``` src/```* (o código criado ficará aqui);
- *```dist/```* (o código gerado pelo Babel ficará aqui).
  
No arquivo *```package.json```*, vamos configurar os scripts dessa forma:

```javaScript
"scripts": {
"start": "nodemon dist/server.js",
"build": "babel src -d dist --presets es2015",
"watch": "babel src -w -d dist --presets es2015"
}
```
- start: inicia o servidor e reinicia ele sempre que o arquivo server.js for modificado.
- build: gera código usando o babel.
- watch: geta código usando o babel sempre que algum arquivo do diretório src/ for modificado.

## Criando o arquivo *```server.js```*:

```javaScript
import express from 'express';
let app = express();
app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
})
```
Execute *```npm run build```* para gerar os arquivos usando o Babel. Em seguida execute *```npm run start```* para iniciar o servidor.

## Definindo as URLs:

```javaScript
let app = express();
let router = express.Router();
router.route('/books') .get((req, res) => {
res.send('list of all books'); });
app.use('/', router);
app.listen(3000, () => {
console.log('Example app listening on port 3000!');
})
```
- *```req```* possui informações sobre a requisição 
- *```res```* possui informações sobre a resposta



