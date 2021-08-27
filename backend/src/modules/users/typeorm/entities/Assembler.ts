import {
  Column,
  Entity,
  OneToMany,
} from 'typeorm';
import AssemblerInstallation from '../../../installations/typeorm/entities/AssemblerInstallation';

import User from './User';

// Representação da entidade montador no banco de dados que herda os dados de usuário
@Entity('assembler')
class Admin extends User {
  @Column()
  cellphone: string;

  @OneToMany(
    () => AssemblerInstallation,
    (assembler_installation) => assembler_installation.assembler,
    { cascade: true },
  )
  assembler_installations: AssemblerInstallation[];

  constructor() {
    super();
    this.user_type = 'assembler';
  }
}

export default Admin;
