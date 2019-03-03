import express from 'express';
import { Alunos } from './models';


let router = express.Router(); 

router.route('/alunos')
    .get((req,res)=>{
        Alunos.findAll().then(function(alunos){
            res.json(alunos);
        })
    })

    .post((req,res)=>{
       const nome = req.body.nome;
       const matricula = req.body.matricula;
       const personalidade = req.body.personalidade;
       const data = {nome: nome, matricula: matricula, personalidade: personalidade};

       Alunos.create(data).then((aluno)=>{
           res.json({message: 'Aluno adicionado'})
       });
    });

router.route('/alunos/:aluno_id')
    .get((req,res)=>{
        Alunos.findById(req.params.aluno_id).then(aluno=>{
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
                personalidade: req.body.personalidade
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
    });



export default router;