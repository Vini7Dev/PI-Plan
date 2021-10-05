import ICreateAssemblerDTO from '../dtos/ICreateAssemblerDTO';
import Assembler from '../typeorm/entities/Assembler';

interface IAssemblersRepository {
  findById(id: string): Promise<Assembler | undefined>;
  findManyById(ids: string[]): Promise<Assembler[]>;
  findByUsername(username: string): Promise<Assembler | undefined>;
  findBySearchParameter(search_string: string): Promise<Assembler[]>;
  create(data: ICreateAssemblerDTO): Promise<Assembler>;
  delete(id: string): Promise<string>;
  list(): Promise<Assembler[]>;
  update(data: ICreateAssemblerDTO): Promise<Assembler>;
}

export default IAssemblersRepository;
