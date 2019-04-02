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

    var realista = req.body.realista;
    var intelectual = req.body.intelectual;
    var social = req.body.social;
    var empreendedor = req.body.empreendedor;
    var convencional = req.body.convencional;
    var artistico = req.body.artistico;

    _models.Alunos.create(data).then(function (aluno) {
        var data2 = {
            alunosId: aluno.id,
            realista: realista,
            intelectual: intelectual,
            social: social, empreendedor: empreendedor,
            convencional: convencional,
            artistico: artistico
        };
        _models.Personalidades.create(data2).then(function (personalidade) {
            res.json({ message: 'Aluno adicionado' });
        });
    });
});

router.route('/aluno/:aluno_id').get(function (req, res) {
    _models.Alunos.findById(req.params.aluno_id, { include: [{
            model: _models.Personalidades,
            attributes: ['realista', 'intelectual', 'social', 'empreendedor', 'convencional', 'artistico']
        }],
        where: {
            alunosId: req.params.aluno_id
        },
        attributes: ['nome', 'matricula', 'faculdade', 'curso']
    }).then(function (aluno) {
        if (aluno) {
            res.json(aluno);
        } else {
            res.json({ error: 'Aluno inexistente' });
        }
    });
})

//futuramente pode ser interessante criar um update para alterar os atributos de Personalidade, pois o alunos pode querer
// refazer o questionário.
.put(function (req, res) {
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
            _models.Personalidades.findOne({ where: { alunosId: req.params.aluno_id } }).then(function (personalidade) {
                if (personalidade) {
                    personalidade.destroy().then(function () {
                        aluno.destroy().then(function () {

                            res.json({ message: 'perfil deletado' });
                        });
                    });
                } else {
                    aluno.destroy().then(function (book) {

                        res.json({ message: 'perfil deletado' });
                    });
                }
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
            profissao.getMateriais().then(function (material) {
                res.json(material);
            });
            // res.json({profissao:profissao, materiais:profissao.getMateriais()});
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
router.route('/profissoes/:profissao_id/trilha').get(function (req, res) {
    _models.Profissoes.findById(req.params.profissao_id).then(function (profissao) {
        if (profissao) {
            profissao.getMateriais({
                attributes: ['titulo'] }).then(function (materiais) {
                if (materiais) {
                    res.json(materiais, { attributes: ['materiaisProfissoes.pontos'] });
                } else {
                    res.json({ message: 'materiais não encontrados' });
                }
            });
        } else {
            res.json({ message: 'profissão não encontrada' });
        }
    });
}).post(function (req, res) {
    var pontos = req.body.pontos;
    var etapa = req.body.etapa;
    var titulo = req.body.titulo;

    _models.Profissoes.findById(req.params.profissao_id).then(function (profissao) {
        if (profissao) {
            _models.Materiais.findOne({ where: { titulo: titulo } }).then(function (material) {

                if (material) {

                    profissao.addMateriais(material, { through: { pontos: pontos, etapa: etapa } });
                    res.json({ message: 'entrou' });
                } else {
                    res.json({ message: 'material não encontrado' });
                }
            });
        } else {
            res.json({ message: 'profisão inexistente' });
        }
    });
});

router.route('/usuario').get(function (req, res) {
    Usuario.findAll().then(function (usuario) {
        res.send(usuario);
    });
}).post(function (req, res) {
    var login = req.body.login;
    var email = req.body.email;

    _bcrypt2.default.hash(req.body.senha, 12).then(function (result) {
        Usuario.create({ login: login, senha: result,
            email: email }).then(function (usuario) {
            res.json({ message: 'Usuário adicionado' });
        });
    });
});

router.route('/auth').post(function (req, res) {
    Usuario.findOne({ where: { login: req.body.login } }).then(function (usuario) {
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
            res.json(material);
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

exports.default = router;