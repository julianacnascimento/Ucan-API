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
            social: social,
            empreendedor: empreendedor,
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
    _models.Profissoes.findAll().then(function (profissoes) {
        res.json(profissoes);
    });
}).post(function (req, res) {
    var nome = req.body.nome;
    var descricao = req.body.descricao;
    var competencias = req.body.competencias;
    var data = { nome: nome, descricao: descricao, competencias: competencias };

    _models.Profissoes.create(data).then(function (profissoes) {
        res.json({ message: 'Profissão adicionada' });
    });
});

router.route('/profissao/:profissoes_id').get(function (req, res) {
    _models.Profissoes.findById(req.params.profissoes_id).then(function (profissoes) {
        if (profissoes) {
            res.json(profissoes.getMateriais());
        } else {
            res.json({ erro: 'profissao não encontrado' });
        }
    });
}).put(function (req, res) {
    _models.Profissoes.findById(req.params.profissoes_id).then(function (profissoes) {
        if (profissoes) {
            profissoes.update({
                nome: req.body.nome,
                descricao: req.body.descricao,
                competencias: req.body.competencias
            });
            res.json({ message: 'dados atualizados com sucesso' });
        } else {
            res.json({ erro: 'profissao não encontrada' });
        }
    });
}).delete(function (req, res) {
    _models.Profissoes.findById(req.params.profissoes_id).then(function (profissoes) {
        if (profissoes) {
            profissoes.destroy().then(function (profissoes) {
                res.json({ mensagem: 'Profissão deletada!' });
            });
        } else {
            res.json({ erro: 'profissão não encontrada' });
        }
    });
});

router.route('/profissoes/:profissoes_id/trilha').get(function (req, res) {
    var id = req.params.profissoes_id;
    _models.Materiais.findAll({ include: [{ model: _models.MateriaisProfissoes, as: 'materiaisId' /*, where:{
                                                                                                  profissoesId: id
                                                                                                  }*/ }] }).then(function (materiais) {
        res.json(materiais);
    });
}).post(function (req, res) {
    var pontos = req.body.pontos;
    var etapa = req.body.etapa;
    var materiaisId = req.body.materiaisId;
    var profissoesId = req.body.profissoesId;

    var data = { pontos: pontos, etapa: etapa, materiaisId: materiaisId, profissoesId: profissoesId };
    _models.MateriaisProfissoes.create(data).then(function (mt) {
        res.json({ message: 'material adicionado na trilha' });
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

router.route('/usuario').get(function (req, res) {
    _models.Usuario.findAll().then(function (usuario) {
        res.send(usuario);
    });
}).post(function (req, res) {
    var nome = req.body.nome;
    var email = req.body.email;

    _bcrypt2.default.hash(req.body.senha, 12).then(function (result) {
        _models.Usuario.create({ nome: nome, senha: result,
            email: email }).then(function (usuario) {
            res.json({ message: 'Usuário adicionado' });
        });
    });
});

router.route('/usuario/:usuarioId').get(function (req, res) {
    _models.Usuario.findById(req.params.usuarioId).then(function (usuario) {
        if (usuario) {
            res.json(usuario);
        } else {
            res.json({ error: 'Usuário não encontrado!' });
        }
    });
}).put(function (req, res) {
    _models.Usuario.findById(req.params.usuarioId).then(function (usuario) {
        if (usuario) {
            usuario.update({ nome: req.body.nome,
                email: req.body.email }).then(function () {
                res.json(usuario);
            });
        } else {
            res.json({ error: 'Usuário não encontrado!' });
        }
    });
}).delete(function (req, res) {
    _models.Usuario.findById(req.params.usuarioId).then(function (usuario) {
        if (usuario) {
            usuario.destroy().then(function (usuario) {
                res.json({ message: 'Usuário deletado!' });
            });
        } else {
            res.json({ error: 'Usuário não encontrado!' });
        }
    });
});

router.route('/auth').post(function (req, res) {
    _models.Usuario.findOne({ where: { email: req.body.email } }).then(function (usuario) {
        if (usuario) {
            _bcrypt2.default.compare(req.body.senha, usuario.senha).then(function (result) {
                if (result) {
                    // Se a senha estiver correta;
                    var token = _jsonwebtoken2.default.sign(usuario.get({ plain: true }), "mudar");
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
    var token = req.headers['x-access-token'];

    if (token) {
        _jsonwebtoken2.default.verify(token, "mudar", function (err, decoded) {
            res.json(decoded);
        });
    } else {
        res.json({ message: 'Token não encontrado' });
    }
});

router.route('/admin').get(function (req, res) {
    _models.Admin.findAll().then(function (admin) {
        res.send(admin);
    });
}).post(function (req, res) {
    var nome = req.body.nome;
    var email = req.body.email;

    _bcrypt2.default.hash(req.body.senha, 12).then(function (result) {
        _models.Admin.create({ nome: nome, senha: result,
            email: email }).then(function (admin) {
            res.json({ message: 'Administrador cadastrado!' });
        });
    });
});

router.route('/auth.admin').post(function (req, res) {
    _models.Admin.findOne({ where: { email: req.body.email } }).then(function (admin) {
        if (admin) {
            _bcrypt2.default.compare(req.body.senha, admin.senha).then(function (result) {
                if (result) {
                    // Se a senha estiver correta;
                    var token = _jsonwebtoken2.default.sign(admin.get({ plain: true }), "mudar_admin");
                    res.json({ message: 'Admin autenticado!', token: token });
                } else {
                    //Se a senha estiver errada;
                    res.json({ message: 'EMAIL e/ou senha não combinam!' });
                }
            });
        } else {
            res.json({ message: 'email e/ou senha não combinam!' });
        }
    });
});

router.route('/perfil.admin').get(function (req, res) {
    var token = req.headers['x-access-token'];

    if (token) {
        _jsonwebtoken2.default.verify(token, "mudar_admin", function (err, decoded) {
            res.json(decoded);
        });
    } else {
        res.json({ message: 'Token não encontrado' });
    }
});

exports.default = router;