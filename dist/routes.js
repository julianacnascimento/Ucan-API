'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _models = require('./models');

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _crypto = require('crypto');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

<<<<<<< HEAD
router.route('/alunos/:page/:perPage').get(function (req, res) {
    var pageNo = parseInt(req.params.page);
    var size = parseInt(req.params.perPage);
    if (pageNo < 0 || pageNo === 0) {
        res.send('página não encontrada');
    }
    var pular = size * (pageNo - 1);
    var limite = size;
    _models.Alunos.findAll({ offset: pular, limit: limite }).then(function (alunos) {
=======
router.route('/aluno').get(function (req, res) {
    _models.Alunos.findAll({ attributes: ['nome', 'matricula', 'faculdade', 'curso'] }).then(function (alunos) {
>>>>>>> d2d2d3fc20e8cdffecf98bcd429f163e43bbf0c9
        res.json(alunos);
    });
}).post(function (req, res) {
    var nome = req.body.nome;
    var matricula = req.body.matricula;
    var faculdade = req.body.faculdade;
    var curso = req.body.curso;
    var data = { nome: nome, matricula: matricula, faculdade: faculdade, curso: curso };

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
                faculdade: req.body.faculdade,
                curso: req.body.curso
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
    var competencias = req.body.competencias;
    var data = { nome: nome, descrição: descrição, competencias: competencias };

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
                descrição: req.body.descrição,
                competencias: req.body.competencias
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
    _models.Usuario.findAll().then(function (usuario) {
        res.send(usuario);
    });
}).post(function (req, res) {
    var login = req.body.login;
    var email = req.body.email;

    _bcrypt2.default.hash(req.body.senha, 12).then(function (result) {
        _models.Usuario.create({ login: login, senha: result,
            email: email }).then(function (usuario) {
            res.json({ message: 'Usuário adicionado' });
        });
    });
});

router.route('/auth').post(function (req, res) {
    _models.Usuario.findOne({ where: { login: req.body.login } }).then(function (usuario) {
        if (usuario) {
            _bcrypt2.default.compare(req.body.senha, usuario.senha).then(function (result) {
                if (result) {
                    // Se a senha estiver correta;
                    var token = _jsonwebtoken2.default.sign(usuario.get({ plain: true }), usuario.senha);
                    res.json({ message: 'Usuário autenticado!', token: token });
                } else {
                    //Se a senha estiver errada;
                    res.json({ message: 'Usuário e/ou senha errados!' });
                }
            });
        } else {
            res.json({ message: 'Usuário não encontrado' });
        }
    });
});

router.route('/perfil').get(function (req, res) {
    var token = req.headers['x-acess-token'];

    if (token) {
        _jsonwebtoken2.default.verify(token, secret, function (err, decoded) {
            res.json(decoded);
        });
    } else {
        res.json({ message: 'Token não encontrado' });
    }
});

router.route('/materiais').get(function (req, res) {
    _models.Materiais.findAll({
        attributes: ['titulo', 'descrição', 'link']
    }).then(function (materiais) {
        res.json(materiais);
    });
}).post(function (req, res) {
    var titulo = req.body.titulo;
    var descrição = req.body.descrição;
    var link = req.body.link;

    var data = { titulo: titulo, descrição: descrição, link: link };

    _models.Materiais.create(data).then(function (material) {
        res.json({ message: 'material cadastrado com sucesso!' });
    });
});
router.route('/materiais/:materiais_id').get(function (req, res) {
    _models.Materiais.findById(req.params.materiais_id).then(function (profissao) {
        if (profissao) {
            res.json(profissao);
        } else {
            res.json({ erro: 'profissão não encontrada' });
        }
    });
});
exports.default = router;