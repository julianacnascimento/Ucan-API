import express from 'express';
import { Alunos, Profissoes, Materiais } from './models';


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

       Alunos.create(data).then((aluno)=>{
           res.json({message: 'Aluno adicionado'})
       });

    });


router.route('/alunos/:aluno_id')
    .get((req,res)=>{
        Alunos.findById(req.params.aluno_id).then((aluno)=>{
            if(aluno){
                res.json(aluno);
            }else{
                res.json({error:'Aluno inexistente'});
            }
        });
    })

    .put((req,res)=>{
        Alunos.findById(req.params.aluno_id).then((aluno)=>{
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
                aluno.destroy().then((book)=>{
                    res.json({message: 'perfil deletado'})
                });
            }else{
                res.json({error:'aluno não encontrado'});
            }
        });
    })


router.route('/profissoes')
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
                res.json(profissao);
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
            res.json(materiais)
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
export default router;