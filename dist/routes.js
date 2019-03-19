'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _models = require('./models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/alunos').get(function (req, res) {
    _models.Alunos.findAll({ attributes: ['nome', 'matricula', 'faculdade', 'curso'] }).then(function (alunos) {
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

router.route('/alunos/:aluno_id').get(function (req, res) {
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

router.route('/profissoes').get(function (req, res) {
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
    _models.Materiais.findById(req.params.materiais_id).then(function (material) {
        if (material) {
            res.json(maerial);
        } else {
            res.json({ erro: 'profissão não encontrada' });
        }
    });
}).put(function (req, res) {
    _models.Materiais.findById(req.params.materiais_id).then(function (material) {
        if (material) {
            material.update({
                titulo: req.body.titulo,
                descrição: req.body.descrição,
                link: req.body.link
            });
            res.json({ message: 'dados adicionados com sucesso' });
        } else {
            res.json({ erro: 'material não encontrado' });
        }
    });
}).delete(function (req, res) {
    _models.Materiais.findById(req.params.materiais_id).then(function (material) {
        if (material) {
            material.destroy();
            res.json({ message: 'material deletado com sucesso!' });
        } else {
            res.json({ error: 'material não encontrado' });
        }
    });
});
exports.default = router;