import express from 'express';
import 'reflect-metadata';
import '../typeorm';
import routes from './routes';

// Instanciando o servidor
const app = express();

// Definindo o uso do JSON na aplicação
app.use(express.json());

// Aplicando as rotas ao servidor
app.use(routes);

// Iniciando o servidor
app.listen(3333, () => {
    console.log('===> Server started on port 3333 <===');
});
