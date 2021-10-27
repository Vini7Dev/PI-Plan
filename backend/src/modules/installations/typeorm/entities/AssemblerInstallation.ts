import {
  Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn,
} from 'typeorm';

import Assembler from '../../../users/typeorm/entities/Assembler';
import Installation from './Installation';

@Entity('assembler_installation')
class AssemblerInstallation {
  @PrimaryColumn('uuid')
  assembler_id: string;

  @ManyToOne(
    () => Assembler,
    (assembler) => assembler.assembler_installations,
  )
  @JoinColumn({ name: 'assembler_id' })
  assembler: Assembler;

  @PrimaryColumn('uuid')
  installation_id: string;

  @ManyToOne(
    () => Installation,
    (installation) => installation.assemblers_installation,
  )
  @JoinColumn({ name: 'installation_id' })
  installation: Installation;

  @Column('int')
  commission_percentage: number;

  @CreateDateColumn()
  created_at: Date;
}

export default AssemblerInstallation;
