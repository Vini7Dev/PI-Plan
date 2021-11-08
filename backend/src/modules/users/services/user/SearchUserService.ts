import { inject, injectable } from 'tsyringe';
import IAdminsRepository from '../../repositories/IAdminsRepository';
import IAssemblersRepository from '../../repositories/IAssemblersRepository';

import User from '../../typeorm/entities/User';

@injectable()
class SearchUserService {
  constructor(
    @inject('AdminsRepository')
    private adminsRepository: IAdminsRepository,

    @inject('AssemblersRepository')
    private assemblersRepository: IAssemblersRepository,
  ) {}

  public async execute(search_string = ''): Promise<User[]> {
    // Pesquisando os usuários administradores e montadores
    const filteredAdmins = await this.adminsRepository.findBySearchParameter(search_string);

    const filteredAssemblers = await this.assemblersRepository.findBySearchParameter(search_string);

    // Juntando a resposta em um vetor
    const usersList = [...filteredAdmins, ...filteredAssemblers];

    return usersList;
  }
}

export default SearchUserService;
