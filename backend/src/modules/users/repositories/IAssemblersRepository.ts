import ICreateAssemblerDTOS from '../dtos/ICreateAssemblerDTOS';
import Assembler from '../entities/Assembler';

interface IAssemblersRepository {
    findByUsername(username: string): Promise<Assembler | undefined>;
    create(data: ICreateAssemblerDTOS): Promise<Assembler>;
    delete(id: string): Promise<string>;
    list(): Promise<Assembler[]>;
    update(data: ICreateAssemblerDTOS): Promise<Assembler>;
}

export default IAssemblersRepository;
