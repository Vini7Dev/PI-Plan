import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import cors from 'cors';
import { errors as celebrateErrors } from 'celebrate';

import '../typeorm'; // Criando a conexão com o banco
import '../container'; // Importando os containers registrados

import routes from './routes';
import uploadConfig from '../../configs/uploadConfig';
import AppError from '../errors/AppError';

// Instanciando o servidor
const app = express();

// Adicionando o CORS na aplicação
app.use(cors());

// Definindo o uso do JSON na aplicação
app.use(express.json());

// Aplicando a rota principal com todas as demais no servidor
app.use(routes);

// Definindo a rota para acessso para as imagens salvas no servidor
app.use('/files', express.static(uploadConfig.uploadsFolder));

// Tratação de erros do celebrate
app.use(celebrateErrors());

// Tratando os erros que ocorrerem na aplicação
app.use((error: Error | AppError, request: Request, response: Response, next: NextFunction) => {
  console.log(error);

  if (error instanceof AppError) {
    return response.status(error.code).json({ error: error.message });
  }

  // Em caso de erros inesperados, retornar a mensagem de erro interno
  console.log(error.message);
  return response.status(500).json({ error: 'Internal server error.' });
});

// Iniciando o servidor
app.listen(3333, () => {
  // Mensagem emitida no terminal quando o servidor iniciar
  console.log('===> Server started on port 3333 <===');
});
