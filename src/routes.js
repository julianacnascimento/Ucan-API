import express from 'express';
import { Alunos, Profissoes } from './models';
import { Usuario } from '../dist/models';
import bcrypt from 'bcrypt'
import jwt from 'jsonwevtoken'


let router = express.Router(); 

router.route('/aluno')
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

router.route('/aluno/:aluno_id')
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




router.route('/profissao')
    .get((req,res)=>{
        Profissoes.findAll().then(function(profissao){
            res.json(profissao)
        })
    })
    .post((req,res)=>{
        const nome = req.body.nome;
        const descrição = req.body.descrição;
        const data = {nome: nome, descrição: descrição};

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
                    descrição: req.body.descrição
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

    router.route('/usuario')
    .get((req, res) => {
        Usuario.findAll().then(function(usuario) {
            res.send(usuario);
        });
    })
    .post(function (req, res) {
        let user = req.body.usuario;
        let email = req.body.email;

    bcrypt.hash(req.body.password, 12).then((result) => {
        Usuario.create({user:user, password:result, 
            email:email}).then((usuario) => {
                res.json({message:'Usuário adicionado'});
            });
        });
    });

router.route('/auth').post((req, res) => {
    User.findOne({where: {user:req.body.user}}).then((user) => {
        if(usuario) {
            bcrypt.compare(req.body.password,
                user.password).then((result) => {
                    if (result) {
                        const token = jwt.sign(user.get({plain:true}), secret);
                        res.json({message:'Usuario e/ou senha errados', token:token})
                    } else {
                        res.json({message:'Senha errada'})
                    }
                });
        } else {
            res.json({message: 'Usuário não encontrado'})
        }
    })
});

route.route('/perfil').get((req, res) => {
    const token = req.headers['x-acess-token'];

    if (token) {
        jwt.verify(token, secret, (err, decoded) => {
            res.json(decoded);
        });
    } else {
        res.json({message:'Token não encontrado'})
    }
});

export default router;