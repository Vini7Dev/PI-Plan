import { Router } from 'express';
import AssemblersController from '../controllers/AssemblersController';

// Instanciando as rotas do modelo montador
const assemblerRoutes = Router();

// Instanciando o controller de montador
const assemblersController = new AssemblersController();

// Criando as rotas dos montadores
assemblerRoutes.get('/', assemblersController.get);
assemblerRoutes.post('/', assemblersController.create);
assemblerRoutes.put('/:id', assemblersController.update);
assemblerRoutes.delete('/:id', assemblersController.delete);

export default assemblerRoutes;
