import express from 'express';
import 'reflect-metadata';
import '../database'; // Criando a conexão com o banco
import routes from './routes';

// Instanciando o servidor
const app = express();

// Definindo o uso do JSON na aplicação
app.use(express.json());

// Aplicando a rota principal com todas as demais no servidor
app.use(routes);

// Iniciando o servidor
app.listen(3333, () => {
  // Mensagem emitida no terminal quando o servidor iniciar
  console.log('===> Server started on port 3333 <===');
});
