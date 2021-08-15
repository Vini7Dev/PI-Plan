import { Router } from 'express';

const customerRoutes = Router();

customerRoutes.get('/', async (request, response) => response.json({ message: 'customer get.' }));
customerRoutes.post('/', async (request, response) => response.json({ message: 'customer post.' }));
customerRoutes.put('/:id', async (request, response) => response.json({ message: 'customer put.' }));
customerRoutes.delete('/:id', async (request, response) => response.json({ message: 'customer delete.' }));

export default customerRoutes;
