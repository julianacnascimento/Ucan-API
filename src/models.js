import Sequelize from 'sequelize';

let sequelize = new Sequelize('ucan_db', null, null,{
    host: 'localhost',
    dialect: 'sqlite',
    storage: './data.sqlite'
});

export let Alunos = sequelize.define('alunos',{
    nome: Sequelize.STRING,
    matricula: {type: Sequelize.INTEGER, allownull: false, unique: 'compositeindex'},
    personalidade: Sequelize.INTEGER

});

Alunos.sync();