import { container } from 'tsyringe';

import IDateProvider from './DateProvider/models/IDateProvider';
import DateProvider from './DateProvider/implementations/DateProvider';

import IHashProvider from './HashProvider/models/IHashProvider';
import BCryptProvider from './HashProvider/implementations/BCryptProvider';

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiscStorageProvider from './StorageProvider/implementations/DiscStorageProvider';

// Registrando os containers dos provedores
container.registerSingleton<IDateProvider>(
  'DateProvider', DateProvider,
);

container.registerSingleton<IHashProvider>(
  'HashProvider', BCryptProvider,
);

container.registerSingleton<IStorageProvider>(
  'StorageProvider', DiscStorageProvider,
);
