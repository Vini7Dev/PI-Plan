import { Request, Response, NextFunction } from 'express';

// Middleware pra garantir que o usuário autenticado que realizou a requisição seja um administrador
const ensureAdmin = async (
  request: Request, response: Response, next: NextFunction,
): Promise<void> => {
  // Verificando se o usuário que realizou a requisição é do tipo administrador,
  // do contrário, lançar um erro
  const { user_type } = request.user;

  if (user_type !== 'admin') {
    throw new Error("User isn't admin.");
  }

  // Continuar a requisição
  next();
};

export default ensureAdmin;
