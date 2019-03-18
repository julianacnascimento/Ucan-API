'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _models = require('./models');

var _models2 = require('../dist/models');

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/aluno').get(function (req, res) {
    _models.Alunos.findAll().then(function (alunos) {
        res.json(alunos);
    });
}).post(function (req, res) {
    var nome = req.body.nome;
    var matricula = req.body.matricula;
    var personalidade = req.body.personalidade;
    var data = { nome: nome, matricula: matricula, personalidade: personalidade };

    _models.Alunos.create(data).then(function (aluno) {
        res.json({ message: 'Aluno adicionado' });
    });
});

router.route('/aluno/:aluno_id').get(function (req, res) {
    _models.Alunos.findById(req.params.aluno_id).then(function (aluno) {
        if (aluno) {
            res.json(aluno);
        } else {
            res.json({ error: 'Aluno inexistente' });
        }
    });
}).put(function (req, res) {
    _models.Alunos.findById(req.params.aluno_id).then(function (aluno) {
        if (aluno) {
            aluno.update({ nome: req.body.nome,
                matricula: req.body.matricula,
                personalidade: req.body.personalidade
            });
        } else {
            res.json({ erro: 'aluno não encontrado' });
        }
    });
}).delete(function (req, res) {
    _models.Alunos.findById(req.params.aluno_id).then(function (aluno) {
        if (aluno) {
            aluno.destroy().then(function (book) {
                res.json({ message: 'perfil deletado' });
            });
        } else {
            res.json({ error: 'aluno não encontrado' });
        }
    });
});

router.route('/profissao').get(function (req, res) {
    _models.Profissoes.findAll().then(function (profissao) {
        res.json(profissao);
    });
}).post(function (req, res) {
    var nome = req.body.nome;
    var descrição = req.body.descrição;
    var data = { nome: nome, descrição: descrição };

    _models.Profissoes.create(data).then(function (profissao) {
        res.json({ message: 'Profissão adicionada' });
    });
});

router.route('/profissoes/:profissoes_id').get(function (req, res) {
    _models.Profissoes.findById(req.params.profissoes_id).then(function (profissao) {
        if (profissao) {
            res.json(profissao);
        } else {
            res.json({ erro: 'profissao não encontrado' });
        }
    });
}).put(function (req, res) {
    _models.Profissoes.findById(req.params.profissoes_id).then(function (profissao) {
        if (profissao) {
            profissao.update({
                nome: req.body.nome,
                descrição: req.body.descrição
            });
            res.json({ message: 'dados atualizados com sucesso' });
        } else {
            res.json({ erro: 'profissao não encontrada' });
        }
    });
}).delete(function (req, res) {
    _models.Profissoes.findById(req.params.profissoes_id).then(function (profissao) {
        if (profissao) {
            profissao.destroy();
            res.json({ mensagem: 'profissão deletada com sucesso' });
        } else {
            res.json({ erro: 'profissão não encontrada' });
        }
    });
});

router.route('/usuario').get(function (req, res) {
    _models2.Usuario.findAll().then(function (usuario) {
        res.send(usuario);
    });
}).post(function (req, res) {
    var login = req.body.login;
    var email = req.body.email;

    _bcrypt2.default.hash(req.body.senha, 12).then(function (result) {
        _models2.Usuario.create({ login: login, senha: result,
            email: email }).then(function (usuario) {
            res.json({ message: 'Usuário adicionado' });
        });
    });
});

router.route('/auth').post(function (req, res) {
    _models2.Usuario.findOne({ where: { login: req.body.login } }).then(function (usuario) {
        if (usuario) {
            _bcrypt2.default.compare(req.body.senha, usuario.senha).then(function (result) {
                if (result) {
                    var token = _jsonwebtoken2.default.sign(usuario.get({ plain: true }), secret);
                    res.json({ message: 'Usuario autenticado', token: token });
                } else {
                    res.json({ message: 'Senha errada' });
                }
            });
        } else {
            res.json({ message: 'Usuário não encontrado' });
        }
    });
});

router.route('/perfil').get(function (req, res) {
    var token = req.headers['x-access-token'];

    if (token) {
        _jsonwebtoken2.default.verify(token, secret, function (err, decoded) {
            res.json(decoded);
        });
    } else {
        res.json({ message: 'Token não encontrado' });
    }
});

exports.default = router;