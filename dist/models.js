'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MateriaisProfissoes = exports.Materiais = exports.PerfisProfissionais = exports.Usuario = exports.Profissoes = exports.ProfissoesInteresse = exports.Personalidades = exports.Alunos = undefined;

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sequelize = new _sequelize2.default('ucan_db', null, null, {
    host: 'localhost',
    dialect: 'sqlite',
    storage: './data.sqlite'
});

//faculdade, matricula e curso, podem ser um atributo composto(vinculo academico) e se desejável, se tornar uma tabela.
var Alunos = exports.Alunos = sequelize.define('alunos', {
    nome: _sequelize2.default.STRING,
    faculdade: _sequelize2.default.STRING,
    matricula: _sequelize2.default.INTEGER,
    curso: _sequelize2.default.STRING
});

Alunos.sync();

//aluno referencia Alunos
var Personalidades = exports.Personalidades = sequelize.define('personalidades', {
    realista: _sequelize2.default.INTEGER,
    intelectual: _sequelize2.default.INTEGER,
    social: _sequelize2.default.INTEGER,
    empreendedor: _sequelize2.default.INTEGER,
    convencional: _sequelize2.default.INTEGER,
    artistico: _sequelize2.default.INTEGER
});

Alunos.hasOne(Personalidades, { foreignKey: 'alunosId' });

Personalidades.sync();
//Profissões de interesse do aluno 
var ProfissoesInteresse = exports.ProfissoesInteresse = sequelize.define('profissoesInteresse', {
    aluno: _sequelize2.default.INTEGER,
    profissao: _sequelize2.default.INTEGER

});

var Profissoes = exports.Profissoes = sequelize.define('profissoes', {
    nome: _sequelize2.default.STRING,
    descrição: _sequelize2.default.TEXT,
    Competencias: _sequelize2.default.TEXT
});
Profissoes.sync();

var Usuario = exports.Usuario = sequelize.define('usuario', {
    login: _sequelize2.default.STRING,
    senha: _sequelize2.default.STRING,
    email: _sequelize2.default.STRING
});
Alunos.hasOne(Usuario);
Usuario.sync();

var PerfisProfissionais = exports.PerfisProfissionais = sequelize.define('perfisProfissionais', {
    profissoes: _sequelize2.default.INTEGER,
    realista: _sequelize2.default.INTEGER,
    intelectual: _sequelize2.default.INTEGER,
    social: _sequelize2.default.INTEGER,
    empreendedor: _sequelize2.default.INTEGER,
    convencional: _sequelize2.default.INTEGER,
    artistico: _sequelize2.default.INTEGER
});
PerfisProfissionais.sync();

var Materiais = exports.Materiais = sequelize.define('materiais', {
    titulo: _sequelize2.default.STRING,
    descrição: _sequelize2.default.TEXT,
    link: _sequelize2.default.STRING
});
Materiais.sync();

var MateriaisProfissoes = exports.MateriaisProfissoes = sequelize.define('materiaisProfissoes', {
    pontos: _sequelize2.default.INTEGER,
    etapa: _sequelize2.default.INTEGER
});

Materiais.belongsToMany(Profissoes, { through: 'materiaisProfissoes', foreignKey: 'profissoesId' });
Profissoes.belongsToMany(Materiais, { through: 'materiaisProfissoes', foreignKey: 'materiaisId' });
MateriaisProfissoes.sync();