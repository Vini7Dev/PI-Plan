import { container } from 'tsyringe';

import IAdminsRepository from '../../modules/users/repositories/IAdminsRepository';
import AdminsRepository from '../../modules/users/typeorm/repositories/AdminsRepository';

import IAssemblersRepository from '../../modules/users/repositories/IAssemblersRepository';
import AssemblersRepository from '../../modules/users/typeorm/repositories/AssemblersRepository';

import ICustomersRepository from '../../modules/customers/repositories/ICustomersRepository';
import CustomersRepository from '../../modules/customers/typeorm/repositories/CustomersRepository';

// Importando os containers dos provedores
import './providers';

// Registrando os repositórios nos seus respectivos containers
container.registerSingleton<IAdminsRepository>(
  'AdminsRepository', AdminsRepository,
);

container.registerSingleton<IAssemblersRepository>(
  'AssemblersRepository', AssemblersRepository,
);

container.registerSingleton<ICustomersRepository>(
  'CustomersRepository', CustomersRepository,
);
