import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import Jogador from '../models/Jogador';
import Round from '../models/Round';

class RoundController {

    async list(req: Request, res: Response){

        const repository = getRepository(Round);//recupera o repositorio de Endereço.

        const lista = await repository.find();//executa o comando de selecao para recuperar todos os Rounds.

        return res.json(lista);//retorna a lista
    }

    async store(req: Request, res: Response){

        const repository = getRepository(Round);//recupera o repositorio de Endereço
        console.log(req.body);
        const end = repository.create(req.body);
        await repository.save(end);
        return res.json(end);
    }

    //codigo fonte referente a parate 11.
    async delete(req: Request, res: Response){
        try{
            const repository = getRepository(Round);
            const {id} = req.body;
            const end = await repository.findOne({where : {"id" : id }});
            if(end){
                await repository.remove(end);
                return res.sendStatus(204);
            }else{
                return res.sendStatus(404);
            }
        }catch(e:unknown){
        
            console.log(e);
            return res.sendStatus(500);
        }

        }

        async update(req: Request, res: Response){ //altera
    
            const repository = getRepository(Round); //recupera o repositorio do jogador.
        
            const {nickname} = req.body; //extrai os atributos nickname e jogador do corpo da mensagem.
        
            const jogadorExists = await getRepository(Jogador).findOne({where : {"nickname" : nickname}}); //consulta na tabela se existe um registro com o mesmo jogador da mensagem.
           

            if( !jogadorExists){
                    return res.sendStatus(404);
            }
            
            const j = repository.create(req.body); //cria a entidade Jogador
            
            await repository.save(j); //persiste (update) a entidade na tabela.
            
            return res.json(j);
        }
}

export default new RoundController();