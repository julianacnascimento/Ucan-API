import Sequelize from 'sequelize';

let sequelize = new Sequelize('ucan_db', null, null,{
    host: 'localhost',
    dialect: 'sqlite',
    storage: './data.sqlite'
});

//faculdade, matricula e curso, podem ser um atributo composto(vinculo academico) e se desejável, se tornar uma tabela.
export let Alunos = sequelize.define('alunos',{
    nome: Sequelize.STRING,
    faculdade: Sequelize.STRING,
    matricula: Sequelize.INTEGER,
    curso: Sequelize.STRING
});

//aluno referencia Alunos
export let Personalidades= sequelize.define('personalidades', {
    realista:Sequelize.INTEGER,
    intelectual:Sequelize.INTEGER,
    social:Sequelize.INTEGER,
    empreendedor: Sequelize.INTEGER,
    convencional: Sequelize.INTEGER,
    artistico: Sequelize.INTEGER
});

//Profissões de interesse do aluno 
export let ProfissoesInteresse = sequelize.define('profissoesInteresse',{
    aluno: Sequelize.INTEGER,
    profissao: Sequelize.INTEGER
    
});

export let Profissoes = sequelize.define('profissoes',{
    nome: Sequelize.STRING,
    descrição: Sequelize.TEXT,
    competencias: Sequelize.TEXT
});

export let Usuario  = sequelize.define('usuario', {
    nome: Sequelize.STRING,
    senha: Sequelize.STRING,
    email: Sequelize.STRING
});

export let PerfisProfissionais = sequelize.define('perfisProfissionais',{
    profissoes:Sequelize.INTEGER,
    realista:Sequelize.INTEGER,
    intelectual:Sequelize.INTEGER,
    social:Sequelize.INTEGER,
    empreendedor: Sequelize.INTEGER,
    convencional: Sequelize.INTEGER,
    artistico: Sequelize.INTEGER
});


export let Materiais = sequelize.define('materiais',{
    titulo: Sequelize.STRING,
    descrição: Sequelize.TEXT,
    link: Sequelize.STRING
});


export let MateriaisProfissoes = sequelize.define('materiaisProfissoes',{
    pontos: Sequelize.INTEGER,
    etapa: Sequelize.INTEGER
});

Alunos.sync();
Alunos.hasOne(Personalidades, {foreignKey: 'alunosId'});

Personalidades.sync();

Profissoes.sync();

Alunos.hasOne(Usuario);
Usuario.sync();

PerfisProfissionais.sync();

Materiais.sync();

Materiais.belongsToMany(Profissoes, {through:'materiaisProfissoes', foreignKey:'profissoesId'});
Profissoes.belongsToMany(Materiais, {through: 'materiaisProfissoes', foreignKey: 'materiaisId'});
MateriaisProfissoes.sync()
