import Sequelize from 'sequelize';

let sequelize = new Sequelize('ucan_db', null, null,{
    host: 'localhost',
    dialect: 'sqlite',
    storage: './data.sqlite'
});

export let Alunos = sequelize.define('alunos',{
    nome: Sequelize.STRING,
    matricula: Sequelize.INTEGER,
    personalidade: Sequelize.INTEGER

});


export let Profissoes = sequelize.define('profissoes',{
    nome: Sequelize.STRING,
    descrição: Sequelize.TEXT,

});


export let Usuario  = sequelize.define('usuario', {
    usuario: Sequelize.STRING,
    senha: Sequelize.STRING,
    email: Sequelize.STRING
});

Alunos.hasOne(Usuario);

Alunos.sync();
Profissoes.sync();
Usuario.sync();