import { getRepository } from 'typeorm';

import ICreateAssemblerDTOS from '../../controllers/ICreateAssemblerDTOS';
import Assembler from '../../entities/Assembler';
import IAssemblersRepository from '../IAssemblersRepository';

class AssemblersRepository implements IAssemblersRepository {
  private repository = getRepository(Assembler);

  // Buscando um montador pelo seu username
  public async findByUsername(username: string): Promise<Assembler | undefined> {
    const findedAssembers = await this.repository.findOne({ username });

    return findedAssembers;
  }

  // Listando todos os montadores
  public async list(): Promise<Assembler[]> {
    const assemblers = await this.repository.find();

    return assemblers;
  }

  // Cadastrando um novo usuário montador
  public async create({
    id,
    name,
    cellphone,
    username,
    password,
  }: ICreateAssemblerDTOS): Promise<Assembler> {
    const createdAssembler = this.repository.create({
      id,
      name,
      cellphone,
      username,
      password,
    });

    await this.repository.save(createdAssembler);

    return createdAssembler;
  }

  // Atualizando um montador
  public async update({
    id,
    name,
    cellphone,
    username,
    password,
  }: ICreateAssemblerDTOS): Promise<Assembler> {
    const updatedAssembler = await this.repository.save({
      id,
      name,
      cellphone,
      username,
      password,
    });

    return updatedAssembler;
  }

  // Apagando um montador
  public async delete(id: string): Promise<string> {
    await this.repository.softDelete(id);

    return 'Montador removido';
  }
}

export default AssemblersRepository;
