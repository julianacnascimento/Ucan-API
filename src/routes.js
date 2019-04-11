import express from 'express';
import { Alunos, Profissoes, Materiais, MateriaisProfissoes, Personalidades, Usuario } from './models';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


let router = express.Router(); 

router.route('/alunos')
    .get((req,res)=>{
        Alunos.findAll({attributes:[
            'nome',
            'matricula', 
            'faculdade', 
            'curso'
        ]}).then(function(alunos){
            res.json(alunos);
        })
    })

    .post((req,res)=>{

        const nome = req.body.nome;
        const matricula = req.body.matricula;
        const faculdade = req.body.faculdade;
        const curso = req.body.curso
        const data = {nome: nome, matricula: matricula, faculdade: faculdade, curso: curso};

        const realista = req.body.realista;
        const intelectual = req.body.intelectual;
        const social = req.body.social;
        const empreendedor = req.body.empreendedor;
        const convencional= req.body.convencional;
        const artistico = req.body.artistico;

        Alunos.create(data).then((aluno)=>{
            const data2 = {
                alunosId: aluno.id,
                realista:realista, 
                intelectual:intelectual, 
                social:social,empreendedor:empreendedor, 
                convencional:convencional,
                artistico: artistico
            }
        Personalidades.create(data2).then((personalidade)=>{
            res.json({message: 'Aluno adicionado'})
        }) 

        })

    });

router.route('/aluno/:aluno_id')
    .get((req,res)=>{
        Alunos.findById(req.params.aluno_id,{include: [ {
            model: Personalidades,
            attributes:[
                'realista',
                'intelectual',
                'social',
                'empreendedor',
                'convencional',
                'artistico'
            ]
        }],
            where: {
                alunosId: req.params.aluno_id 
            },
            attributes:[
                'nome',
                'matricula', 
                'faculdade', 
                'curso'
            ]
        }).then((aluno)=>{
            if(aluno){
                res.json(aluno);
            }else{
                res.json({error:'Aluno inexistente'});
            }
        });
    })

    .put((req,res)=>{
        Alunos.findById(req.params.aluno_id ).then((aluno)=>{
            if (aluno){
                aluno.update({nome:req.body.nome, 
                matricula: req.body.matricula, 
                faculdade: req.body.faculdade,
                curso: req.body.curso
                });
            }else{
                res.json({erro: 'aluno não encontrado'});
            }
        });
    })

    .delete((req,res)=>{
        Alunos.findById(req.params.aluno_id).then((aluno)=>{
            if(aluno){
                Personalidades.findOne({where: {alunosId: req.params.aluno_id}}).then((personalidade)=>{
                    if(personalidade){
                        personalidade.destroy().then(()=>{
                            aluno.destroy().then(()=>{

                                res.json({message: 'perfil deletado'})
                            });
                        })
                    }else{
                        aluno.destroy().then((book)=>{

                            res.json({message: 'perfil deletado'})
                        });
                    }
                })
            }else{
                res.json({error:'aluno não encontrado'});
            }
        });
    })


router.route('/profissao')
    .get((req,res)=>{
        Profissoes.findAll().then(function(profissao){
            res.json(profissao)
        })
    })
    .post((req,res)=>{
        const nome = req.body.nome;
        const descrição = req.body.descrição;
        const competencias = req.body.competencias;
        const data = {nome: nome, descrição: descrição, competencias: competencias};

        Profissoes.create(data).then((profissao)=>{
            res.json({message: 'Profissão adicionada'})
        })
    });

router.route('/profissoes/:profissoes_id')
    .get((req,res)=>{
        Profissoes.findById(req.params.profissoes_id).then((profissao)=>{
            if(profissao){
                res.json(profissao.getMateriais());
            }else{
                res.json({erro: 'profissao não encontrado'})
            }
        })
    })
    .put((req,res)=>{
        Profissoes.findById(req.params.profissoes_id).then((profissao)=>{
            if(profissao){
                profissao.update({
                    nome: req.body.nome,
                    descrição: req.body.descrição,
                    competencias: req.body.competencias
                })
                res.json({message:'dados atualizados com sucesso'});
            }else{
                res.json({erro: 'profissao não encontrada'})
            }
        })
    })
    .delete((req,res)=>{
        Profissoes.findById(req.params.profissoes_id).then((profissao)=>{
            if(profissao){
                profissao.destroy();
                res.json({mensagem:'profissão deletada com sucesso'})
            }else{
                res.json({erro: 'profissão não encontrada'})
            }
        })
    });

    
    
router.route('/profissoes/:profissoes_id/trilha')
    .get((req, res)=>{
        let id = req.params.profissoes_id;
        Materiais.findAll({include: [{model: MateriaisProfissoes, as: 'materiaisId'/*, where:{
            profissoesId: id
        }*/}]}).then(function(materiais){
            res.json(materiais);
        })
    })
    .post((req, res)=>{
        const pontos = req.body.pontos;
        const etapa = req.body.etapa;
        const materiaisId = req.body.materiaisId;
        const profissoesId = req.body.profissoesId;

        const data = {pontos: pontos, etapa: etapa, materiaisId: materiaisId, profissoesId: profissoesId};
        MateriaisProfissoes.create(data).then((mt)=>{
            res.json({message: 'material adicionado na trilha'})
        })
    })

router.route('/materiais')
    .get((req, res)=>{
        Materiais.findAll({
            attributes:[
                'titulo',
                'descrição',
                'link'
            ]
        }).then(function(materiais){
            res.json(materiais);
        })
    })
    .post((req, res)=>{
        const titulo = req.body.titulo;
        const descrição = req.body.descrição;
        const link = req.body.link;

        const data = {titulo: titulo, descrição: descrição, link: link};

        Materiais.create(data).then((material)=>{
            res.json({message: 'material cadastrado com sucesso!'});
        });
    })
router.route('/materiais/:materiais_id')
    .get((req, res)=>{
        Materiais.findById(req.params.materiais_id).then((material)=>{
            if(material){
                res.json(maerial);
            }else{
                res.json({erro:'profissão não encontrada'});
            }
        })
    })
    .put((req,res)=>{
        Materiais.findById(req.params.materiais_id).then((material)=>{
            if(material){
                material.update({
                    titulo: req.body.titulo,
                    descrição: req.body.descrição,
                    link: req.body.link
                })
                res.json({message: 'dados adicionados com sucesso'});
            }else{
                res.json({erro: 'material não encontrado'});
            }
        })
    })
    .delete((req, res)=>{
        Materiais.findById(req.params.materiais_id).then((material)=>{
            if(material){
                material.destroy();
                res.json({message:'material deletado com sucesso!'});
            }else{
                res.json({error:'material não encontrado'});
            }
        })
    })
    router.route('/usuario')
    .get((req, res) => {
        Usuario.findAll().then(function(usuario) {
            res.send(usuario);
        });
    })
    .post(function (req, res) {
        let login = req.body.login;
        let email = req.body.email;
        
        bcrypt.hash(req.body.senha, 12).then((result) => {
            Usuario.create({login:login, senha:result, 
                email:email}).then((usuario) => {
                    res.json({message:'Usuário adicionado'});
                });
            });
    });

router.route('/auth').post((req, res) => {
    Usuario.findOne({where: {login:req.body.login}}).then((usuario) => {
        if(usuario) {
            bcrypt.compare(req.body.senha,
                usuario.senha).then((result) => {
                    if (result) {  // Se a senha estiver correta;
                        const token = jwt.sign(usuario.get({plain:true}), usuario.senha);
                        res.json({message:'Usuário autenticado!', token:token})
                    } else { //Se a senha estiver errada;
                        res.json({message:'Usuário e/ou senha errados!'})
                    }
                })
        } else {
            res.json({message: 'Usuário não encontrado'})
        }
    });
    router.route('/perfil').get((req, res) => {
        const token = req.headers['x-acess-token'];
    
        if (token) {
            jwt.verify(token, secret, (err, decoded) => {
                res.json(decoded);
            })
        } else {
            res.json({message:'Token não encontrado'})
        }
    });
});

export default router;