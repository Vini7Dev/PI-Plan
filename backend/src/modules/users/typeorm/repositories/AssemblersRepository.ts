import { getRepository, Repository } from 'typeorm';

import ICreateAssemblerDTO from '../../dtos/ICreateAssemblerDTO';
import Assembler from '../entities/Assembler';
import IAssemblersRepository from '../../repositories/IAssemblersRepository';

class AssemblersRepository implements IAssemblersRepository {
  private repository: Repository<Assembler>;

  constructor() {
    this.repository = getRepository(Assembler);
  }

  // Buscando um montador pelo id
  public async findById(id: string): Promise<Assembler | undefined> {
    const assembler = await this.repository.findOne(id);

    return assembler;
  }

  // Buscando vários montadores pelo id
  public async findManyById(ids: string[]): Promise<Assembler[]> {
    const findedAssembler = await this.repository.findByIds(ids);

    return findedAssembler;
  }

  // Buscando um montador pelo seu username
  public async findByUsername(username: string): Promise<Assembler | undefined> {
    const findedAssembers = await this.repository.findOne({ username });

    return findedAssembers;
  }

  // Aplicando a busca por um montador a partir de uma string
  public async findBySearchParameter(search_string: string): Promise<Assembler[]> {
    const assemblersList = await this.repository.createQueryBuilder('assembler')
      .where(`assembler.name ILIKE '%${search_string}%'`)
      .orWhere(`assembler.username ILIKE '%${search_string}%'`)
      .orWhere(`assembler.cellphone ILIKE '%${search_string}%'`)
      .getMany();

    return assemblersList;
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
  }: ICreateAssemblerDTO): Promise<Assembler> {
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
  }: ICreateAssemblerDTO): Promise<Assembler> {
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
