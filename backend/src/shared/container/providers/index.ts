import { container } from 'tsyringe';

import IDateProvider from './DateProvider/models/IDateProvider';
import DateProvider from './DateProvider/implementations/DateProvider';

import IHashProvider from './HashProvider/models/IHashProvider';
import BCryptProvider from './HashProvider/implementations/BCryptProvider';
import IClassTransformer from './ClassTransformerProvider/models/IClassTransformer';
import ClassTransformer from './ClassTransformerProvider/implementations/ClassTransformer';

// Registrando os containers dos provedores
container.registerSingleton<IDateProvider>(
  'DateProvider', DateProvider,
);

container.registerSingleton<IHashProvider>(
  'HashProvider', BCryptProvider,
);

container.registerSingleton<IClassTransformer>(
  'ClassTransformer', ClassTransformer,
);
