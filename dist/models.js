'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Usuario = exports.Profissoes = exports.Alunos = undefined;

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sequelize = new _sequelize2.default('ucan_db', null, null, {
    host: 'localhost',
    dialect: 'sqlite',
    storage: './data.sqlite'
});

var Alunos = exports.Alunos = sequelize.define('alunos', {
    nome: _sequelize2.default.STRING,
    matricula: _sequelize2.default.INTEGER,
    personalidade: _sequelize2.default.INTEGER

});

var Profissoes = exports.Profissoes = sequelize.define('profissoes', {
    nome: _sequelize2.default.STRING,
    descrição: _sequelize2.default.TEXT

});

var Usuario = exports.Usuario = sequelize.define('usuario', {
    login: _sequelize2.default.STRING,
    senha: _sequelize2.default.STRING,
    email: _sequelize2.default.STRING
});

Usuario.hasOne(Alunos);

Alunos.sync();
Profissoes.sync();
Usuario.sync({ force: 'true' });