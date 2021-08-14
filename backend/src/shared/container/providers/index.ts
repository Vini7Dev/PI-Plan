import { container } from 'tsyringe';

import IHashProvider from './HashProvider/models/IHashProvider';
import BCryptProvider from './HashProvider/implementations/BCryptProvider';

// Registrando os containers dos provedores
container.registerSingleton<IHashProvider>(
  'HashProvider', BCryptProvider,
);
