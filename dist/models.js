'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Alunos = undefined;

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
    matricula: { type: _sequelize2.default.INTEGER, allownull: false, unique: 'compositeindex' },
    personalidade: _sequelize2.default.INTEGER

});

Alunos.sync();