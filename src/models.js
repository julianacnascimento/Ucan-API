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
Alunos.sync();

export let Profissoes = sequelize.define('profissoes',{
    nome: Sequelize.STRING,
    descrição: Sequelize.TEXT,

})

Profissoes.sync();

export let Material = sequelize.define('materiais',{
    tipo: Sequelize.STRING,
    titulo:Sequelize.TEXT,
    area:Sequelize.STRING,
    link: Sequelize.STRING
})

Material.sync();